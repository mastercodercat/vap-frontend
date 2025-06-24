import { Button, Text, Flex, Box, Dialog, TextField } from "@radix-ui/themes";
import { useAppDispatch, useTypedSelector } from "../store/hooks";
import { closeSignInDialog } from "../store/slices/uiSlice";
import { signIn, clearError } from "../store/slices/authSlice";
import { useState, useEffect } from "react";
import type { RootState } from "../store";

export function SignInDialog() {
  const dispatch = useAppDispatch();
  const isSignInDialogOpen = useTypedSelector(
    (state: RootState) => state.ui.isSignInDialogOpen
  );
  const { isLoading, error, isAuthenticated } = useTypedSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Close dialog and clear form on successful authentication
  useEffect(() => {
    if (isAuthenticated && isSignInDialogOpen) {
      dispatch(closeSignInDialog());
      setEmail("");
      setPassword("");
    }
  }, [isAuthenticated, isSignInDialogOpen, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(signIn({ email, password }));
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeSignInDialog());
      dispatch(clearError());
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Dialog.Root open={isSignInDialogOpen} onOpenChange={handleOpenChange}>
      <Dialog.Content>
        <Dialog.Title>Sign In to VAP</Dialog.Title>

        {error && (
          <Box
            mb="4"
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
                Email
              </Text>
              <TextField.Root
                type="email"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                disabled={isLoading}
                size="3"
                placeholder="Enter your email"
              />
            </Box>

            <Box>
              <Text as="div" size="2" mb="2" weight="bold">
                Password
              </Text>
              <TextField.Root
                type="password"
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                disabled={isLoading}
                size="3"
                placeholder="Enter your password"
              />
            </Box>

            <Button
              type="submit"
              disabled={isLoading}
              size="3"
              style={{ width: "100%" }}
            >
              {isLoading ? (
                <Flex align="center" gap="2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Signing In...
                </Flex>
              ) : (
                "Sign In"
              )}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
