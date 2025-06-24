import * as Dialog from "@radix-ui/react-dialog";
import { useAppDispatch, useTypedSelector } from "../store/hooks";
import { closeSignUpDialog } from "../store/slices/uiSlice";
import { signUp, clearError } from "../store/slices/authSlice";
import { useState, useEffect } from "react";
import type { RootState } from "../store";

export function SignUpDialog() {
  const dispatch = useAppDispatch();
  const isSignUpDialogOpen = useTypedSelector(
    (state: RootState) => state.ui.isSignUpDialogOpen
  );
  const { isLoading, error, isAuthenticated } = useTypedSelector(
    (state: RootState) => state.auth
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Close dialog and clear form on successful authentication
  useEffect(() => {
    if (isAuthenticated && isSignUpDialogOpen) {
      dispatch(closeSignUpDialog());
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [isAuthenticated, isSignUpDialogOpen, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(signUp({ name, email, password }));
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeSignUpDialog());
      dispatch(clearError());
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Dialog.Root open={isSignUpDialogOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4">
          <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
            Create Your VAP Account
          </Dialog.Title>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
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
