import { useNavigate, useLocation } from "react-router-dom";
import { useTypedSelector } from "../store/hooks";
import { useAppDispatch } from "../store/hooks";
import { signOut } from "../store/slices/authSlice";
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
    { id: "dashboard", label: "Dashboard", icon: "📊", path: "/dashboard" },
    { id: "developers", label: "Developers", icon: "👨‍💻", path: "/developers" },
    { id: "resume", label: "Resume Generation", icon: "📄", path: "/resume" },
    { id: "projects", label: "Projects", icon: "📁", path: "/projects" },
    { id: "analytics", label: "Analytics", icon: "📈", path: "/analytics" },
    { id: "settings", label: "Settings", icon: "⚙️", path: "/settings" },
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
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">VAP</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.path)}
                className={`
                  w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors
                  ${
                    getActiveItem() === item.id
                      ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Info and Sign Out */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
