"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { clearUser, syncFromContext } from "../../store/slices/userSlice";
import {
  markAllAsRead,
  markAsRead,
  deleteNotification,
} from "../../store/slices/notificationsSlice";
import { useAuth } from "../../context/AuthContext";

interface MenuOption {
  id: string;
  label: string;
  icon: string;
  href?: string;
  subOptions?: MenuOption[];
}

interface HomeLayoutProp {
  children: ReactNode;
  menuOptions: MenuOption[];
}

export const LayoutAdmin = ({ children, menuOptions }: HomeLayoutProp) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [activeOption, setActiveOption] = useState<string>("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { logout } = useAuth();

  // Obtener datos del usuario y notificaciones desde Redux
  const { currentUser} = useSelector(
    (state: RootState) => state.user,
  );
  const { notifications, unreadCount } = useSelector(
    (state: RootState) => state.notifications,
  );

  // Sincronizar con el contexto al cargar
  useEffect(() => {
    dispatch(syncFromContext());
  }, [dispatch]);

  const toggleSubmenu = (optionId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId],
    );
  };

  const handleOptionClick = (option: MenuOption) => {
    if (option.subOptions && option.subOptions.length > 0) {
      toggleSubmenu(option.id);
    } else {
      setActiveOption(option.id);
      setSidebarOpen(false);

      if (option.href) {
        navigate(option.href);
      }
    }
  };

  const handleLogout = () => {
    logout(); // Usar el logout del contexto
    dispatch(clearUser());
    navigate("/login");
  };

  const handleNotificationClick = (notificationId: string) => {
    dispatch(markAsRead(notificationId));
    const notification = notifications.find((n) => n.id === notificationId);
    if (notification?.link) {
      navigate(notification.link);
      setShowNotifications(false);
    }
  };

  const handleDeleteNotification = (
    e: React.MouseEvent,
    notificationId: string,
  ) => {
    e.stopPropagation();
    dispatch(deleteNotification(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "bi-check-circle-fill text-green-500";
      case "warning":
        return "bi-exclamation-triangle-fill text-yellow-500";
      case "error":
        return "bi-x-circle-fill text-red-500";
      default:
        return "bi-info-circle-fill text-blue-500";
    }
  };

  // Obtener iniciales del usuario
  const getUserInitials = () => {
    if (!currentUser) return "U";
    if (currentUser.firstName && currentUser.dadLastName) {
      return `${currentUser.firstName.charAt(0)}${currentUser.dadLastName.charAt(0)}`.toUpperCase();
    }
    return currentUser.name?.charAt(0).toUpperCase() || "U";
  };

  // Obtener nombre completo
  const getFullName = () => {
    if (!currentUser) return "Usuario";
    if (currentUser.firstName && currentUser.dadLastName) {
      return `${currentUser.firstName} ${currentUser.dadLastName} ${currentUser.momLastName || ""}`;
    }
    return currentUser.name || "Usuario";
  };

  // Si no está autenticado, no renderizar el layout
  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex justify-between">
        {/* Sidebar */}
        <div
          className={`fixed z-50 w-[20%] h-[100vh] overflow-auto bg-blue-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div
            className="flex items-center justify-center h-16 bg-blue-900 cursor-pointer"
            onClick={() => navigate("/admin/dashboard")}
          >
            <h1 className="text-white text-xl font-bold">Dashboard</h1>
          </div>

          <nav className="mt-5 px-2">
            {menuOptions.map((option) => (
              <div key={option.id} className="mb-1">
                <button
                  onClick={() => handleOptionClick(option)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeOption === option.id
                      ? "bg-blue-700 text-white"
                      : "text-blue-100 hover:bg-blue-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <i className={`bi ${option.icon} mr-3 text-lg`}></i>
                    <span>{option.label}</span>
                  </div>
                  {option.subOptions && option.subOptions.length > 0 && (
                    <i
                      className={`bi bi-chevron-${expandedMenus.includes(option.id) ? "up" : "down"} text-xs`}
                    ></i>
                  )}
                </button>

                {option.subOptions && expandedMenus.includes(option.id) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {option.subOptions.map((subOption) => (
                      <button
                        key={subOption.id}
                        onClick={() => {
                          setActiveOption(subOption.id);
                          setSidebarOpen(false);
                          navigate(subOption.href ?? "settings/user");
                        }}
                        className={`w-full flex items-center px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                          activeOption === subOption.id
                            ? "bg-blue-600 text-white"
                            : "text-blue-200 hover:bg-blue-600 hover:text-white"
                        }`}
                      >
                        <i
                          className={`bi ${subOption.icon} mr-3 text-base`}
                        ></i>
                        <span>{subOption.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="w-[80%] relative overflow-auto h-[100vh]">
          {/* Top navigation */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <i className="bi bi-list text-xl"></i>
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Panel de Administración
                </h2>
              </div>

              <div className="flex flex-1 justify-end items-center gap-x-4 lg:gap-x-6">
                {/* Notifications */}
                <div className="relative">
                  <button
                    className="flex items-center gap-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 relative"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <i className="bi bi-bell text-lg"></i>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Notificaciones
                        </h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={handleMarkAllAsRead}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Marcar todas como leídas
                          </button>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-gray-500">
                            <i className="bi bi-bell-slash text-2xl block mb-2"></i>
                            <p className="text-sm">No hay notificaciones</p>
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              onClick={() =>
                                handleNotificationClick(notification.id)
                              }
                              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                                !notification.read ? "bg-blue-50" : ""
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <i
                                  className={`bi text-lg ${getNotificationIcon(notification.type)} flex-shrink-0 mt-1`}
                                ></i>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900">
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-gray-600 truncate">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(
                                      notification.date,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                                <button
                                  onClick={(e) =>
                                    handleDeleteNotification(e, notification.id)
                                  }
                                  className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                                >
                                  <i className="bi bi-x text-lg"></i>
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User menu */}
                <div className="relative">
                  <button
                    className="flex items-center gap-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      {currentUser?.photo ? (
                        <img
                          src={currentUser.photo}
                          alt="User avatar"
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-blue-600 font-semibold text-sm">
                          {getUserInitials()}
                        </span>
                      )}
                    </div>
                    <span>{getFullName()}</span>
                    <i className="bi bi-chevron-down text-xs ml-1"></i>
                  </button>

                  {/* User dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                            {currentUser?.photo ? (
                              <img
                                src={currentUser.photo}
                                alt="User avatar"
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-blue-600 font-semibold">
                                {getUserInitials()}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {getFullName()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {currentUser?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            navigate("/admin/profile");
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <i className="bi bi-person"></i>
                          Mi Perfil
                        </button>
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            navigate("/admin/settings");
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <i className="bi bi-gear"></i>
                          Configuración
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <i className="bi bi-box-arrow-right"></i>
                          Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Cerrar dropdowns al hacer click fuera */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
};
