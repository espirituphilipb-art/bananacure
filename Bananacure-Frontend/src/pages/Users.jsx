import { useState, useEffect } from "react";
import {
  FaUserShield,
  FaUserCheck,
  FaUserPlus,
  FaEdit,
  FaTrashAlt,
  FaUser,
} from "react-icons/fa";
import "./Users.css";

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
    <div className="users-outer-frame">
      <div className="users-card-wrapper">
        
        {/* Page Header */}
        <div className="page-header">
          <div className="page-title-group">
            <h2>User Access Management</h2>
            <p>Manage system access, roles, and administrative permissions.</p>
          </div>
          <div className="users-count-chip">
            <FaUserCheck />
            <span>Total Registered: <strong>{users.length} Users</strong></span>
          </div>
        </div>

        {/* USER TABLE CARD (READ) */}
        <section className="table-card">
          <div className="table-card-header">
            <h3>System Accounts</h3>
            <span className="subtitle">Active user directory</span>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Fetching user accounts...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email Address</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        No user accounts registered yet.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td className="user-name-cell">
                          <span className="user-avatar-small">
                            {user.first_name ? user.first_name.charAt(0).toUpperCase() : "U"}
                          </span>
                          {user.first_name || "N/A"}
                        </td>
                        <td className="username-cell">@{user.username}</td>
                        <td>{user.email || "N/A"}</td>
                        <td>
                          <span
                            className={`role-badge ${
                              user.is_staff ? "admin" : "standard"
                            }`}
                          >
                            {user.is_staff ? <FaUserShield /> : <FaUser />}
                            {user.is_staff ? "Administrator" : "Standard User"}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-btn edit"
                              onClick={() => openEditModal(user)}
                              title="Edit User"
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              className="action-btn delete"
                              onClick={() => openDeleteModal(user)}
                              title="Delete User"
                            >
                              <FaTrashAlt /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ADD USER FORM CARD (CREATE) */}
        <section className="add-user-card">
          <div className="card-form-header">
            <FaUserPlus className="form-icon" />
            <div>
              <h3>Add New User Account</h3>
              <p>Create credentials and grant system access level.</p>
            </div>
          </div>

          <form onSubmit={handleCreateSubmit} className="user-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="e.g. Philip Espiritu"
                  required
                />
              </div>

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. pespiritu"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="user@bananacure.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter strong password"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Access Level (Role)</label>
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
                  <option value="false">Standard User (Operator View)</option>
                  <option value="true">Administrator (Full Access)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              <FaUserPlus /> Create User Account
            </button>
          </form>
        </section>

      </div>

      {/* EDIT USER MODAL */}
      {isEditModalOpen && (
        <div className="modal-backdrop" onClick={closeModals}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit User Account</h3>
              <p>Modifying settings for @{selectedUser?.username}</p>
            </div>

            <form onSubmit={handleEditSubmit} className="modal-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>New Password (Optional)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep unchanged"
                />
              </div>

              <div className="form-group">
                <label>System Role</label>
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

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div className="modal-backdrop" onClick={closeModals}>
          <div className="modal-card delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
            </div>
            <p className="delete-text">
              Are you sure you want to delete user account <strong>@{selectedUser?.username}</strong>? This action cannot be reversed.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="delete-btn"
              >
                Yes, Delete Account
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