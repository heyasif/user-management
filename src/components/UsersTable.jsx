import React, { useState } from "react";
import { Table } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function UsersTable({ users, onEdit, onDelete }) {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Sorting function
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField].toLowerCase();
    const valB = b[sortField].toLowerCase();

    return sortOrder === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  // Get sorting icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort />;
    return sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full rounded-lg bg-white text-left shadow-md">
        <Table.Head>
          <Table.HeadCell
            className="cursor-pointer"
            onClick={() => handleSort("id")}
          >
            ID {getSortIcon("id")}
          </Table.HeadCell>
          <Table.HeadCell>Avatar</Table.HeadCell>
          <Table.HeadCell
            className="cursor-pointer"
            onClick={() => handleSort("firstName")}
          >
            Name {getSortIcon("firstName")}
          </Table.HeadCell>
          <Table.HeadCell
            className="cursor-pointer"
            onClick={() => handleSort("email")}
          >
            Email {getSortIcon("email")}
          </Table.HeadCell>
          <Table.HeadCell
            className="cursor-pointer"
            onClick={() => handleSort("department")}
          >
            Department {getSortIcon("department")}
          </Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {sortedUsers.map((user) => (
            <Table.Row key={user.id} className="border-b">
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 font-bold text-white">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </div>
              </Table.Cell>
              <Table.Cell>{`${user.firstName} ${user.lastName}`}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.department}</Table.Cell>
              <Table.Cell className="flex gap-4">
                <HiPencil
                  className="cursor-pointer text-lg text-blue-600 transition-transform hover:scale-110"
                  onClick={() => onEdit(user)}
                />
                <HiTrash
                  className="cursor-pointer text-lg text-red-600 transition-transform hover:scale-110"
                  onClick={() => onDelete(user.id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
