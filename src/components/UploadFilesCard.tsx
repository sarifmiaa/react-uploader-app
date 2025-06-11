import React from "react";
import { BlockStack, Button, Card, InlineGrid, Text } from "@shopify/polaris";
import { UploadIcon } from "@shopify/polaris-icons";

interface UploadFilesCardProps {
  onUploadClick: () => void;
  onClearClick: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  uploadedFilesCount?: number;
}

export const UploadFilesCard: React.FC<UploadFilesCardProps> = ({
  onUploadClick,
  onClearClick,
  title,
  description,
  children,
  uploadedFilesCount = 0,
}) => {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns={2} alignItems="center" gap="200">
          <Text as="h2" variant="headingSm">
            {title}
          </Text>

          <InlineGrid columns={2} gap="150" alignItems="end">
            <InlineGrid></InlineGrid>
            <InlineGrid columns={2} gap="150" alignItems="end">
              <Button
                onClick={onClearClick}
                accessibilityLabel="Clear files"
                tone="critical"
                variant="secondary"
              >
                Clear Files
              </Button>

              <Button
                onClick={onUploadClick}
                accessibilityLabel="Upload files"
                icon={UploadIcon}
                variant="primary"
              >
                Upload
              </Button>
            </InlineGrid>
          </InlineGrid>
        </InlineGrid>

        {description && (
          <Text as="p" variant="bodyMd">
            {description}
          </Text>
        )}

        <Text as="p" variant="bodySm">
          {uploadedFilesCount} file{uploadedFilesCount !== 1 ? "s" : ""}{" "}
          uploaded
        </Text>

        <BlockStack gap="200">{children}</BlockStack>
      </BlockStack>
    </Card>
  );
};
