/*
* Upload file to the server
* @param {File} file - The file to upload
* @returns {Promise<void>} - Resolves when the upload is complete
*/
export async function uploadFile(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:3001/api/files/upload", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
    }
}

// Number of concurrent uploads allowed
const CONCURRENT_UPLOADS = 3;

// Type definition for the file item used in the upload queue
interface UploadFileItem {
    file: File;
    status: "pending" | "uploading" | "uploaded" | "error";
    updateStatus: (status: UploadFileItem["status"]) => void;
}

/*
* Upload files in a queue with concurrency control
* @param {UploadFileItem[]} files - Array of files to upload
* @returns {Promise<void>} - Resolves when all uploads are complete
* This function uploads files in parallel, but limits the number of concurrent uploads to CONCURRENT_UPLOADS.
* Each file's status is updated during the upload process.
* If an upload fails, the file's status is set to "error".
* If an upload succeeds, the file's status is set to "uploaded".
* @throws {Error} - Throws an error if the upload fails 
*/
export async function uploadFilesInQueue(files: UploadFileItem[]) {
    let index = 0;

    const workers = new Array(CONCURRENT_UPLOADS).fill(null).map(async () => {
        while (index < files.length) {
            const currentIndex = index++;
            const currentFile = files[currentIndex];

            currentFile.updateStatus("uploading");

            try {
                await uploadFile(currentFile.file);
                currentFile.updateStatus("uploaded");
            } catch (err) {
                console.error("Upload error:", err);
                currentFile.updateStatus("error");
            }
        }
    });

    await Promise.all(workers);
}
