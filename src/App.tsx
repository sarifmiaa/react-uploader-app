import { BlockStack, Page, Text } from "@shopify/polaris";
import "./App.css";
import { FileUploadZone } from "./components/FileUploadZone";

function App() {
  return (
    <Page fullWidth>
      <BlockStack gap="400">
        <BlockStack inlineAlign="center">
          <Text variant="headingXl" as="h2">
            React File Uploader
          </Text>
        </BlockStack>
        <FileUploadZone />
      </BlockStack>
    </Page>
  );
}

export default App;
