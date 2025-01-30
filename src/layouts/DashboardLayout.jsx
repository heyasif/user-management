import React from "react";
import SidebarComponent from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden bg-gray-50 p-4 md:p-6">
        {children}
      </div>
    </div>
  );
}
