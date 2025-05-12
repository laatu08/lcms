import { ChartNoAxesColumn, Menu, SquareLibrary, X } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <ChartNoAxesColumn size={20} /> },
    { name: "Courses", path: "/admin/course", icon: <SquareLibrary size={20} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  const SidebarContent = () => (
    <>
      <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 tracking-tight">
        Admin Panel
      </h2>

      <nav className="flex flex-col space-y-2">
        {navLinks.map((link) => {
          const isActive = location.pathname.includes(link.path);

          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white dark:bg-cyan-500 dark:text-gray-900 shadow-md"
                  : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-cyan-400"
              } hover:scale-[1.02]`}
            >
              {link.icon}
              <span className="truncate">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[250px] space-y-6 p-5 border-r border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-md sticky top-0 h-screen transition-all duration-300">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar (overlay drawer) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-[250px] bg-white dark:bg-gray-900 p-5 shadow-lg transition-transform duration-300">
            <SidebarContent />
          </div>
          {/* Overlay to close menu */}
          <div
            className="flex-1 bg-black/40 dark:bg-black/60"
            onClick={closeMobileMenu}
          ></div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar with menu button (only on mobile) */}
        <header className="flex items-center justify-between p-4 md:p-6 lg:hidden bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 dark:text-gray-200 focus:outline-none"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Admin Panel
          </h1>
          {/* Placeholder to balance layout */}
          <div className="w-6"></div>
        </header>

        <main className="flex-1 p-6 md:p-10 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
