import * as Dialog from "@radix-ui/react-dialog";
import { useAppDispatch, useTypedSelector } from "../store/hooks";
import {
  closeAddDialog,
  addDeveloper,
  clearError,
} from "../store/slices/developersSlice";
import { useState, useEffect } from "react";
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
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4">
          <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
            Add New Developer
          </Dialog.Title>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter developer name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile File
              </label>
              <input
                type="file"
                required
                onChange={handleFileChange}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.doc,.docx,.txt"
              />
              {fileName && (
                <p className="mt-1 text-sm text-gray-600">
                  Selected: {fileName}
                </p>
              )}
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={isLoading || !file}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </div>
                ) : (
                  "Add Developer"
                )}
              </button>
              <Dialog.Close asChild>
                <button
                  type="button"
                  disabled={isLoading}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </Dialog.Close>
            </div>
          </form>
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
