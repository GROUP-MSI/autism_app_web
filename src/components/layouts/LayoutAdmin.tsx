"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface MenuOption {
  id: string
  label: string
  icon: string
  href?: string
  subOptions?: MenuOption[]
}

interface HomeLayoutProp {
  children: ReactNode
  menuOptions: MenuOption[]
}

export const LayoutAdmin = ({ children, menuOptions }: HomeLayoutProp) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const [activeOption, setActiveOption] = useState<string>("")
  const navigate = useNavigate();

  const toggleSubmenu = (optionId: string) => {
    setExpandedMenus((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]))
  }

  const handleOptionClick = (option: MenuOption) => {
    if (option.subOptions && option.subOptions.length > 0) {
      toggleSubmenu(option.id)
    } else {
      setActiveOption(option.id)
      setSidebarOpen(false) // Close mobile sidebar when option is selected
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex justify-between">
        {/* Sidebar */}
        <div
          className={`fixed z-50 w-[20%] h-[100vh] overflow-auto bg-blue-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-center h-16 bg-blue-900">
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
                    <i className={`bi bi-chevron-${expandedMenus.includes(option.id) ? "up" : "down"} text-xs`}></i>
                  )}
                </button>

                {/* Submenu */}
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
                        <i className={`bi ${subOption.icon} mr-3 text-base`}></i>
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
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <i className="bi bi-list text-xl"></i>
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <h2 className="text-lg font-semibold text-gray-900">Panel de Administración</h2>
              </div>

              <div className="flex flex-1 justify-end items-center gap-x-4 lg:gap-x-6">
                {/* User menu */}
                <div className="flex items-center gap-x-4">
                  <button className="flex items-center gap-x-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                    <i className="bi bi-bell text-lg"></i>
                  </button>
                  <button className="flex items-center gap-x-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                    <i className="bi bi-person-circle text-lg"></i>
                    <span>Usuario</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
            
    </div>
  )
}
