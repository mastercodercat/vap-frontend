import { useNavigate, useLocation } from "react-router-dom";
import { useTypedSelector } from "../store/hooks";
import { useAppDispatch } from "../store/hooks";
import { signOut } from "../store/slices/authSlice";
import { Logo } from "./Logo";
import { Button, Flex, Box, Text } from "@radix-ui/themes";
import {
  DashboardIcon,
  PersonIcon,
  FileTextIcon,
  ClipboardIcon,
  CodeIcon,
  BarChartIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import type { RootState } from "../store";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useTypedSelector((state: RootState) => state.auth);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <DashboardIcon width="20" height="20" />,
      path: "/dashboard",
    },
    {
      id: "developers",
      label: "Developers",
      icon: <PersonIcon width="20" height="20" />,
      path: "/developers",
    },
    {
      id: "resume",
      label: "Resume Generation",
      icon: <FileTextIcon width="20" height="20" />,
      path: "/resume",
    },
    {
      id: "resumes",
      label: "Resumes",
      icon: <ClipboardIcon width="20" height="20" />,
      path: "/resumes",
    },
    {
      id: "projects",
      label: "Projects",
      icon: <CodeIcon width="20" height="20" />,
      path: "/projects",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChartIcon width="20" height="20" />,
      path: "/analytics",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <GearIcon width="20" height="20" />,
      path: "/settings",
    },
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
    // Close mobile sidebar after navigation
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };

  // Get current active item based on location
  const getActiveItem = () => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find((item) => item.path === currentPath);
    return activeItem?.id || "dashboard";
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <Box
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <Box
        className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Logo */}
        <Flex
          align="center"
          justify="center"
          className="h-16 border-b border-gray-200"
        >
          <Logo size="md" />
        </Flex>

        {/* Navigation */}
        <Box className="mt-6">
          <Flex direction="column" gap="2" className="px-4">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleItemClick(item.path)}
                className={`
                  w-full justify-start px-4 py-3
                  ${
                    getActiveItem() === item.id
                      ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <Flex align="center" gap="3">
                  {item.icon}
                  <Text as="p" weight="medium">
                    {item.label}
                  </Text>
                </Flex>
              </Button>
            ))}
          </Flex>
        </Box>

        {/* User Info and Sign Out */}
        <Box className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <Flex align="center" mb="3">
            <Box className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </Box>
            <Box className="ml-3">
              <Text as="p" size="2" weight="medium" className="text-gray-900">
                {user?.name || "User"}
              </Text>
              <Text as="p" size="1" className="text-gray-500">
                {user?.email}
              </Text>
            </Box>
          </Flex>
          <Button
            onClick={handleSignOut}
            className="w-full"
            style={{ backgroundColor: "var(--red-9)", color: "white" }}
          >
            Sign Out
          </Button>
        </Box>
      </Box>
    </>
  );
}
