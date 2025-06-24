import { useAppDispatch, useTypedSelector } from "../store/hooks";
import {
  closeAddDialog,
  addDeveloper,
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

export function AddDeveloperDialog() {
  const dispatch = useAppDispatch();
  const isAddDialogOpen = useTypedSelector(
    (state: RootState) => state.developers.isAddDialogOpen
  );
  const { isLoading, error } = useTypedSelector(
    (state: RootState) => state.developers
  );

  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  // Clear form when dialog closes
  useEffect(() => {
    if (!isAddDialogOpen) {
      setName("");
      setFile(null);
      setFileName("");
    }
  }, [isAddDialogOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      await dispatch(addDeveloper({ name, file }));
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeAddDialog());
      dispatch(clearError());
      setName("");
      setFile(null);
      setFileName("");
    }
  };

  return (
    <Dialog.Root open={isAddDialogOpen} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Title>
          <Heading size="5">Add New Developer</Heading>
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
              <input
                type="file"
                required
                onChange={handleFileChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.doc,.docx,.txt"
              />
              {fileName && (
                <Text size="2" className="mt-1 text-gray-600">
                  Selected: {fileName}
                </Text>
              )}
            </Box>
            <Flex gap="3" pt="4">
              <Button
                type="submit"
                disabled={isLoading || !file}
                style={{ flex: 1 }}
              >
                {isLoading ? (
                  <Flex align="center" justify="center">
                    <Box className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Adding...
                  </Flex>
                ) : (
                  "Add Developer"
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
