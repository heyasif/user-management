import React, { useState, useEffect } from "react";
import { Table, Avatar } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UsersTable({ users, onEdit, onDelete }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="overflow-x-auto">
        <Table className="w-full bg-white text-left shadow-md">
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Avatar</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Department</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {Array.from({ length: 5 }).map((_, index) => (
              <Table.Row key={index} className="border-b">
                <Table.Cell>
                  <Skeleton width={30} />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton circle width={40} height={40} />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton width={120} />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton width={180} />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton width={150} />
                </Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Skeleton circle width={24} height={24} />
                  <Skeleton circle width={24} height={24} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full bg-white text-left shadow-md">
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Avatar</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Department</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id} className="border-b">
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>
                <Avatar
                  img={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
                  rounded
                />
              </Table.Cell>
              <Table.Cell>
                {user.firstName} {user.lastName}
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.department}</Table.Cell>
              <Table.Cell className="flex gap-2">
                <HiPencil
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={() => onEdit(user)}
                />
                <HiTrash
                  className="cursor-pointer text-red-500 hover:text-red-700"
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
