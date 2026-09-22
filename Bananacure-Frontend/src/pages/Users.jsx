import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form State for Adding / Editing Users
  const [formData, setFormData] = useState({
    first_name: "",
    username: "",
    email: "",
    password: "",
    is_staff: false,
  });

  const API_URL = "http://127.0.0.1:8000/api/users/";

  // READ: Fetch users from Django backend
  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // CREATE: Add new user from form
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchUsers();
        resetForm();
      } else {
        const errData = await response.json();
        alert(`Failed to create user: ${JSON.stringify(errData)}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      first_name: user.first_name || "",
      username: user.username,
      email: user.email || "",
      password: "", // Optional during update
      is_staff: user.is_staff,
    });
    setIsEditModalOpen(true);
  };

  // UPDATE: Save edited user
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Clone form data and delete blank password so backend validation passes
    const payload = { ...formData };
    if (!payload.password || payload.password.trim() === "") {
      delete payload.password;
    }

    try {
      const response = await fetch(`${API_URL}${selectedUser.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        fetchUsers();
        closeModals();
      } else {
        const errData = await response.json();
        console.error("Backend validation error:", errData);
        alert(`Failed to update user: ${JSON.stringify(errData)}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // OPEN DELETE MODAL
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // DELETE: Remove User
  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`${API_URL}${selectedUser.id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== selectedUser.id));
        closeModals();
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      username: "",
      email: "",
      password: "",
      is_staff: false,
    });
  };

  const closeModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
    resetForm();
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="content">
        <div className="page-header">
          <h1>User Management</h1>
          <p>Manage system users and permissions.</p>
        </div>

        {/* USER TABLE (READ) */}
        <div className="table-container">
          <h3>Registered Users</h3>

          {loading ? (
            <p>Loading users...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.first_name || "N/A"}</td>
                    <td>{user.username}</td>
                    <td>{user.email || "N/A"}</td>
                    <td>{user.is_staff ? "Administrator" : "Standard User"}</td>
                    <td>
                      <button
                        onClick={() => openEditModal(user)}
                        style={{ marginRight: "8px" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(user)}
                        style={{ color: "red" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ADD USER FORM (CREATE) */}
        <div className="add-user-card">
          <h2>Add New User</h2>
          <p className="subtitle">
            Create a brand new user and add them to the system.
          </p>

          <form onSubmit={handleCreateSubmit}>
            <div className="form-row">
              <label>Full Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Philip Espiritu"
                required
              />
            </div>

            <div className="form-row">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="pespiritu"
                required
              />
            </div>

            <div className="form-row">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@example.com"
                required
              />
            </div>

            <div className="form-row">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="form-row">
              <label>Role</label>
              <select
                name="is_staff"
                value={formData.is_staff}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_staff: e.target.value === "true",
                  }))
                }
              >
                <option value="false">Standard User</option>
                <option value="true">Administrator</option>
              </select>
            </div>

            <div style={{ marginTop: "15px" }}>
              <button type="submit" className="submit-btn">
                Create User
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Edit User</h2>
            <p className="subtitle">Update user details for {selectedUser?.username}</p>

            <form onSubmit={handleEditSubmit}>
              <div className="form-row">
                <label>Full Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label>Password (Leave blank to keep unchanged)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="New password"
                />
              </div>

              <div className="form-row">
                <label>Role</label>
                <select
                  name="is_staff"
                  value={formData.is_staff}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      is_staff: e.target.value === "true",
                    }))
                  }
                >
                  <option value="false">Standard User</option>
                  <option value="true">Administrator</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  Save Changes
                </button>
                <button type="button" onClick={closeModals} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Confirm Delete</h2>
            <p style={{ margin: "15px 0" }}>
              Are you sure you want to delete user <strong>{selectedUser?.username}</strong>? This action cannot be undone.
            </p>

            <div className="modal-actions">
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="delete-btn"
              >
                Yes, Delete
              </button>
              <button type="button" onClick={closeModals} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;