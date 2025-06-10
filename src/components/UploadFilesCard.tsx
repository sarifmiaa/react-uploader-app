import React from "react";
import { BlockStack, Button, Card, InlineGrid, Text } from "@shopify/polaris";
import { UploadIcon } from "@shopify/polaris-icons";

interface UploadFilesCardProps {
  onUploadClick: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const UploadFilesCard: React.FC<UploadFilesCardProps> = ({
  onUploadClick,
  title,
  description,
  children,
}) => {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto" alignItems="center">
          <Text as="h2" variant="headingSm">
            {title}
          </Text>
          <Button
            onClick={onUploadClick}
            accessibilityLabel="Upload files"
            icon={UploadIcon}
          >
            Upload
          </Button>
        </InlineGrid>

        {description && (
          <Text as="p" variant="bodyMd">
            {description}
          </Text>
        )}

        <BlockStack gap="200">{children}</BlockStack>
      </BlockStack>
    </Card>
  );
};
