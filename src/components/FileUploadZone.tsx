import React, { useState, useCallback } from "react";
import { DropZone, Layout } from "@shopify/polaris";
import { UploadFilesCard } from "./UploadFilesCard";
import { UploadedFilesList } from "./UploadedFileList";
import { uploadFilesInQueue } from "../api/uploadFile";

interface UploadFile {
  file: File;
  status: "pending" | "uploading" | "uploaded" | "error";
}

export const FileUploadZone: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[]) => {
      const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
        file,
        status: "pending",
      }));

      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
    []
  );

  const updateFileStatus = (targetFile: File, status: UploadFile["status"]) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) => (f.file === targetFile ? { ...f, status } : f))
    );
  };

  const onUploadClick = async () => {
    await uploadFilesInQueue(
      files.map((f) => ({
        file: f.file,
        status: f.status,
        updateStatus: (newStatus) => updateFileStatus(f.file, newStatus),
      }))
    );
  };

  return (
    <Layout>
      <Layout.Section>
        <DropZone
          accept="image/*"
          type="image"
          onDrop={handleDropZoneDrop}
          allowMultiple
        >
          <DropZone.FileUpload
            actionTitle="Select Images"
            actionHint="Accepts .gif, .jpg, and .png"
          />
        </DropZone>
      </Layout.Section>

      <Layout.Section>
        <UploadFilesCard
          title="Uploaded Files"
          description="Manage your uploaded images here."
          onUploadClick={onUploadClick}
          onClearClick={() => setFiles([])}
          uploadedFilesCount={files.filter(file => file.status === "uploaded").length} 
        >
          <UploadedFilesList files={files} />
        </UploadFilesCard>
      </Layout.Section>
    </Layout>
  );
};
