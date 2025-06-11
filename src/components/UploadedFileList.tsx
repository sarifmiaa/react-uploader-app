import React from "react";
import {
  BlockStack,
  Thumbnail,
  Text,
  Box,
  Grid,
  Badge,
  InlineStack,
} from "@shopify/polaris";
import { NoteIcon } from "@shopify/polaris-icons";
import { formatFileSize } from "../utils/format-file-size";

interface UploadFile {
  file: File;
  status: "pending" | "uploading" | "uploaded" | "error";
}

interface UploadedFilesListProps {
  files: UploadFile[];
}

export const UploadedFilesList: React.FC<UploadedFilesListProps> = ({
  files,
}) => {
  if (files.length === 0) return null;

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  return (
    <BlockStack>
      {files.map(({ file, status }, index) => (
        <Box padding="400" key={index} background="bg-surface">
          <Grid
            columns={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}
            gap={{ xs: "100", sm: "200", md: "200", lg: "200", xl: "200" }}
          >
            {/* Left side: Thumbnail + file info */}
            <Grid.Cell columnSpan={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}>
              <InlineStack gap="300" blockAlign="center">
                <Thumbnail
                  size="small"
                  alt={file.name}
                  source={
                    validImageTypes.includes(file.type)
                      ? window.URL.createObjectURL(file)
                      : NoteIcon
                  }
                />
                <BlockStack gap="100">
                  <Text variant="bodyMd" as="p" fontWeight="medium">
                    {file.name}
                  </Text>
                  <Text variant="bodySm" as="p" tone="subdued">
                    {formatFileSize(file.size)}
                  </Text>
                </BlockStack>
              </InlineStack>
            </Grid.Cell>

            {/* Right side: status badge */}
            <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
              <InlineStack align="end" blockAlign="center">
                <Badge tone={badgeTone(status)}>{status.toUpperCase()}</Badge>
              </InlineStack>
            </Grid.Cell>
          </Grid>
        </Box>
      ))}
    </BlockStack>
  );
};

const badgeTone = (status: string) => {
  switch (status) {
    case "uploading":
      return "attention";
    case "uploaded":
      return "success";
    case "error":
      return "critical";
    default:
      return "info";
  }
};
