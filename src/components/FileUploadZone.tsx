import React, { useState, useCallback } from "react";
import { DropZone, Layout } from "@shopify/polaris";
import { UploadFilesCard } from "./UploadFilesCard";
import { UploadedFilesList } from "./UploadedFileList";

export const FileUploadZone: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
    []
  );

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  const onUploadClick = () => {
    // Implement file picker trigger or upload logic here
    alert("Upload button clicked");
  };

  return (
    <Layout>
      <Layout.Section>
        <DropZone onDrop={handleDropZoneDrop} allowMultiple>
          <DropZone.FileUpload actionTitle="Upload File" actionHint="Accepts .gif, .jpg, and .png" />
        </DropZone>
      </Layout.Section>

      <Layout.Section>
        <UploadFilesCard
          title="Uploaded Files"
          description="Manage your uploaded images here."
          onUploadClick={onUploadClick}
        >
          <UploadedFilesList files={files} validImageTypes={validImageTypes} />
        </UploadFilesCard>
      </Layout.Section>
    </Layout>
  );
};
