import React, { useState, useEffect } from "react";
import UsersTable from "../components/UsersTable";
import UserForm from "../components/UserForm";
import Pagination from "../components/Pagination"; // New Pagination Component
import { Button, TextInput, Modal, Select } from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const API_URL = "https://user-json-04au.onrender.com/users";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8); // Change this to set the number of users per page

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  const handleOpenForm = (user = null) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  const handleUserSubmit = async (data) => {
    try {
      if (selectedUser) {
        const response = await axios.put(`${API_URL}/${selectedUser.id}`, data);
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id ? response.data : user,
          ),
        );
        setFilteredUsers(
          filteredUsers.map((user) =>
            user.id === selectedUser.id ? response.data : user,
          ),
        );
        toast.success("User updated successfully!");
      } else {
        const maxId =
          users.length > 0
            ? Math.max(...users.map((user) => Number(user.id) || 0))
            : 0;
        const newUser = { ...data, id: (maxId + 1).toString() };

        const response = await axios.post(API_URL, newUser);
        setUsers([...users, response.data]);
        setFilteredUsers([...filteredUsers, response.data]);
        toast.success("User added successfully!");
      }
    } catch (error) {
      toast.error("Failed to save user");
    }
    handleCloseForm();
  };

  const handleOpenDeleteModal = (id) => {
    setDeleteUserId(id);
    setDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteUserId}`);
      setUsers(users.filter((user) => user.id !== deleteUserId));
      setFilteredUsers(
        filteredUsers.filter((user) => user.id !== deleteUserId),
      );
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user");
    }
    setDeleteModal(false);
  };

  useEffect(() => {
    let filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm),
    );

    if (selectedDepartment) {
      filtered = filtered.filter(
        (user) => user.department === selectedDepartment,
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset pagination when filtering
  }, [searchTerm, selectedDepartment, users]);

  // **Pagination Logic**
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      {/* <div className="min-h-screen w-full rounded-lg bg-gray-100 p-6 shadow-lg"> */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header Section */}
      <div className="mb-6 flex flex-col items-center justify-between md:flex-row">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-800">Users</h1>
        </div>

        {/* Search & Filter Options */}
        <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
          <TextInput
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            icon={HiOutlineSearch}
            className="w-full md:w-72"
          />
          <Select
            onChange={(e) => setSelectedDepartment(e.target.value)}
            value={selectedDepartment}
            className="w-full md:w-48"
          >
            <option value="">All Departments</option>
            {Array.from(new Set(users.map((user) => user.department))).map(
              (dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ),
            )}
          </Select>
          <Button color="green" onClick={() => handleOpenForm()}>
            + Add User
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="min-h-[400px] overflow-x-auto rounded-lg bg-white p-4 shadow-md">
        {currentUsers.length > 0 ? (
          <>
            <UsersTable
              users={currentUsers}
              onEdit={handleOpenForm}
              onDelete={handleOpenDeleteModal}
            />
            <Pagination
              usersPerPage={usersPerPage}
              totalUsers={filteredUsers.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <p></p>
        )}
      </div>

      {showForm && (
        <UserForm
          show={showForm}
          onClose={handleCloseForm}
          onSubmit={handleUserSubmit}
          user={selectedUser}
        />
      )}

      <Modal show={deleteModal} onClose={() => setDeleteModal(false)} size="md">
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <p className="text-center text-gray-700">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer className="flex justify-center gap-4">
          <Button color="gray" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* </div> */}
    </>
  );
}
