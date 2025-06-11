/*
* Upload file to the server
* @param {File} file - The file to upload
* @returns {Promise<void>} - Resolves when the upload is complete
*/
export async function uploadFile(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);

    // Api url fetch from vite env
    const apiUrl = import.meta.env.VITE_API_URL

    const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
    }
}

// Number of concurrent uploads allowed
const CONCURRENT_UPLOADS = 3;

// Maximum retry attempts for each file
const MAX_RETRIES = 2;

// Type definition for the file item used in the upload queue
interface UploadFileItem {
    file: File;
    status: "pending" | "uploading" | "uploaded" | "error";
    updateStatus: (status: UploadFileItem["status"]) => void;
}

/*
* Upload files in a queue with concurrency control and retry mechanism
* @param {UploadFileItem[]} files - Array of files to upload
* @returns {Promise<void>} - Resolves when all uploads are complete
* This function uploads files in parallel, but limits the number of concurrent uploads to CONCURRENT_UPLOADS.
* Each file's status is updated during the upload process.
* If an upload fails, it retries up to MAX_RETRIES times before setting status to "error".
* If an upload succeeds, the file's status is set to "uploaded".
*/
export async function uploadFilesInQueue(files: UploadFileItem[]) {
    let index = 0;

    const workers = new Array(CONCURRENT_UPLOADS).fill(null).map(async () => {
        while (index < files.length) {
            const currentIndex = index++;
            const currentFile = files[currentIndex];

            currentFile.updateStatus("uploading");

            let attempts = 0;
            let success = false;

            while (attempts < MAX_RETRIES && !success) {
                try {
                    await uploadFile(currentFile.file);
                    currentFile.updateStatus("uploaded");
                    success = true;
                } catch (err) {
                    attempts++;
                    console.error(`Upload error for file ${currentFile.file.name} (attempt ${attempts}):`, err);
                    if (attempts === MAX_RETRIES) {
                        currentFile.updateStatus("error");
                    } else {
                        // Optional delay before retrying (1 second)
                        await new Promise((res) => setTimeout(res, 1000));
                    }
                }
            }
        }
    });

    await Promise.all(workers);
}
