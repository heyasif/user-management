import React, { useState, useEffect } from "react";
import { Modal, Button, Label, TextInput, Select } from "flowbite-react";

export default function UserForm({ show, onClose, onSubmit, user }) {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const departments = [
    "Sales",
    "IT",
    "Legal",
    "Customer Support",
    "R&D",
    "Logistics",
    "Administration",
    "Finance",
    "Marketing",
    "Engineering",
    "HR",
    "Production",
    "Design",
    "Quality Assurance",
    "Operations",
    "Procurement",
  ];

  // Update form data when editing an existing user
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        department: user.department || "",
      });
    } else {
      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
    }
  }, [user]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>{user ? "Edit User" : "Add User"}</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <TextInput
              id="fullName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <TextInput
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onSubmit(formData)}>
          {user ? "Update" : "Add"}
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
