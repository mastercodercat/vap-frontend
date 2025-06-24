import { useAppDispatch, useTypedSelector } from "../store/hooks";
import { signOut } from "../store/slices/authSlice";
import { Button, Flex, Box, Text, Heading } from "@radix-ui/themes";
import {
  HamburgerMenuIcon,
  BellIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import type { RootState } from "../store";

interface HeaderProps {
  onMenuToggle: () => void;
  pageTitle?: string;
}

export function Header({ onMenuToggle, pageTitle = "Dashboard" }: HeaderProps) {
  const dispatch = useAppDispatch();
  const { user } = useTypedSelector((state: RootState) => state.auth);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Box className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
      {/* Mobile menu button */}
      <Button variant="ghost" onClick={onMenuToggle} className="lg:hidden">
        <HamburgerMenuIcon width="24" height="24" />
      </Button>

      {/* Page title */}
      <Box className="flex-1 lg:ml-0">
        <Heading size="5" className="text-gray-900">
          {pageTitle}
        </Heading>
      </Box>

      {/* User menu */}
      <Flex align="center" gap="4">
        {/* Notifications */}
        <Button variant="ghost" size="2">
          <BellIcon width="20" height="20" />
        </Button>

        {/* User dropdown */}
        <Box className="relative">
          <Button variant="ghost" size="2">
            <Flex align="center" gap="2">
              <Box className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
              </Box>
              <Text size="2" className="hidden md:block font-medium">
                {user?.name || user?.email || "User"}
              </Text>
              <ChevronDownIcon width="16" height="16" />
            </Flex>
          </Button>
        </Box>

        {/* Sign out button */}
        <Button
          variant="ghost"
          size="2"
          onClick={handleSignOut}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          Sign Out
        </Button>
      </Flex>
    </Box>
  );
}
