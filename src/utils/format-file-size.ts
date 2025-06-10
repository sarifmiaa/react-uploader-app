/**
 * Formats a size in bytes to a human-readable string with appropriate units:
 * bytes, KB, MB, or GB. The result is rounded to two decimal places where applicable.
 * @param bytes - The size in bytes to format.
 * @returns A string representing the formatted file size.
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} bytes`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};
