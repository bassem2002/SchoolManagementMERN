import React from "react";
import AdminSidebar from "./sidebars/AdminSidebar";
import StudentSidebar from "./sidebars/StudentSidebar";
import TeacherSidebar from "./sidebars/TeacherSidebar";
import Header from "./header/Header";
import { useSelector } from "react-redux";

function GenericLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  // Determine the sidebar component
  const SidebarComponent =
    user?.role === "admin"
      ? AdminSidebar
      : user?.role === "student"
      ? StudentSidebar
      : TeacherSidebar;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - fixed width */}
      <div className="w-64 flex-shrink-0">
        <SidebarComponent />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="mt-16 p-4">
          <div className="w-full overflow-x-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default GenericLayout;
