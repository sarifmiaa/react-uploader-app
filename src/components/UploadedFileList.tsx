import React from "react";
import {
  BlockStack,
  Thumbnail,
  Text,
  Box,
  InlineStack,
} from "@shopify/polaris";
import { NoteIcon } from "@shopify/polaris-icons";
import { formatFileSize } from "../utils/format-file-size";

interface UploadedFilesListProps {
  files: File[];
  validImageTypes: string[];
}

export const UploadedFilesList: React.FC<UploadedFilesListProps> = ({
  files,
  validImageTypes,
}) => {
  if (files.length === 0) return null;

  return (
    <BlockStack>
      {files.map((file, index) => (
        <BlockStack inlineAlign="start" key={index}>
          <Box padding="400">
            <InlineStack gap="300">
              <Thumbnail
                size="small"
                alt={file.name}
                source={
                  validImageTypes.includes(file.type)
                    ? window.URL.createObjectURL(file)
                    : NoteIcon
                }
                
              />
              <Box>
                {file.name}
                <Text variant="bodySm" as="p">
                  {formatFileSize(file.size)}
                </Text>
              </Box>
            </InlineStack>
          </Box>
        </BlockStack>
      ))}
    </BlockStack>
  );
};
