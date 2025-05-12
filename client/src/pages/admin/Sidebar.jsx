import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <ChartNoAxesColumn size={20} /> },
    { name: "Courses", path: "/admin/course", icon: <SquareLibrary size={20} /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-[250px] space-y-6 p-5 border-r border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-md sticky top-0 h-screen transition-all duration-300">
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
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200 
                  ${
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
