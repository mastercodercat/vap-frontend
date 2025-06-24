import { Button, Text, Flex, Box, Dialog, TextField } from "@radix-ui/themes";
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
      <Dialog.Content>
        <Dialog.Title>Create Your VAP Account</Dialog.Title>

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
                Full Name
              </Text>
              <TextField.Root
                type="text"
                required
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                disabled={isLoading}
                size="3"
              />
            </Box>

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
              />
            </Box>

            <Box>
              <Text as="div" size="2" mb="2" weight="bold">
                Password
              </Text>
              <TextField.Root
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                disabled={isLoading}
                size="3"
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
                  Creating Account...
                </Flex>
              ) : (
                "Create Account"
              )}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
