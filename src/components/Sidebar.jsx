import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiOutlineUserGroup,
  HiOutlineCog,
  HiOutlineMenuAlt3,
  HiOutlineCode,
  HiX,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function SidebarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="absolute left-4 top-4 z-50 block rounded-md p-2 text-gray-600 focus:outline-none md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-40 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar aria-label="User Sidebar">
          <Sidebar.Logo
            href="#"
            img="/logo-icon-blue.svg"
            imgAlt="Ajackus Logo"
          />
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item as={Link} to="#" icon={HiOutlineUserGroup}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/users" icon={HiOutlineUserGroup}>
                Users
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="#" icon={HiOutlineCog}>
                Settings
              </Sidebar.Item>
              <Sidebar.Item
                href="https://github.com/heyasif/user-management"
                target="_blank"
                icon={HiOutlineCode}
              >
                GitHub Repo
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
