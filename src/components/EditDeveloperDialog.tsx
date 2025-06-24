import { useAppDispatch, useTypedSelector } from "../store/hooks";
import {
  closeEditDialog,
  updateDeveloper,
  clearError,
} from "../store/slices/developersSlice";
import { useState, useEffect } from "react";
import {
  Button,
  Text,
  TextField,
  Flex,
  Box,
  Heading,
  Dialog,
} from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { RootState } from "../store";

export function EditDeveloperDialog() {
  const dispatch = useAppDispatch();
  const isEditDialogOpen = useTypedSelector(
    (state: RootState) => state.developers.isEditDialogOpen
  );
  const editingDeveloper = useTypedSelector(
    (state: RootState) => state.developers.editingDeveloper
  );
  const { isLoading, error } = useTypedSelector(
    (state: RootState) => state.developers
  );

  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [currentFile, setCurrentFile] = useState("");

  // Update form when editing developer changes
  useEffect(() => {
    if (editingDeveloper) {
      setName(editingDeveloper.name);
      setCurrentFile(editingDeveloper.link);
      setFile(null);
      setFileName("");
    }
  }, [editingDeveloper]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDeveloper) {
      const developerData: { name: string; file?: File } = { name };
      if (file) {
        developerData.file = file;
      }
      await dispatch(
        updateDeveloper({
          id: editingDeveloper.id,
          developerData,
        })
      );
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeEditDialog());
      dispatch(clearError());
    }
  };

  if (!editingDeveloper) return null;

  return (
    <Dialog.Root open={isEditDialogOpen} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Title>
          <Heading size="5">Edit Developer</Heading>
        </Dialog.Title>

        {error && (
          <Box
            p="3"
            style={{
              backgroundColor: "var(--red-2)",
              border: "1px solid var(--red-6)",
              borderRadius: "var(--radius-3)",
              color: "var(--red-11)",
            }}
          >
            {error}
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <Box>
              <Text as="div" size="2" mb="2" weight="bold">
                Name
              </Text>
              <TextField.Root
                type="text"
                required
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                disabled={isLoading}
                placeholder="Enter developer name"
              />
            </Box>
            <Box>
              <Text as="div" size="2" mb="2" weight="bold">
                Profile File
              </Text>
              {currentFile && !file && (
                <Box
                  mb="2"
                  p="2"
                  style={{
                    backgroundColor: "var(--gray-2)",
                    border: "1px solid var(--gray-6)",
                    borderRadius: "var(--radius-2)",
                  }}
                >
                  <Text size="2" className="text-gray-600">
                    Current file: {currentFile.split("/").pop()}
                  </Text>
                </Box>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.doc,.docx,.txt"
              />
              {fileName && (
                <Text size="2" className="mt-1 text-gray-600">
                  New file: {fileName}
                </Text>
              )}
              <Text size="1" className="mt-1 text-gray-500">
                Leave empty to keep the current file
              </Text>
            </Box>
            <Flex gap="3" pt="4">
              <Button type="submit" disabled={isLoading} style={{ flex: 1 }}>
                {isLoading ? (
                  <Flex align="center" justify="center">
                    <Box className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Updating...
                  </Flex>
                ) : (
                  "Update Developer"
                )}
              </Button>
              <Dialog.Close>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  style={{ flex: 1 }}
                >
                  Cancel
                </Button>
              </Dialog.Close>
            </Flex>
          </Flex>
        </form>

        <Dialog.Close>
          <Button
            variant="ghost"
            size="2"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
            }}
          >
            <Cross2Icon width="16" height="16" />
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
