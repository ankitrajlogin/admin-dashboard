import React, { useState, useEffect } from 'react';
import { addUser, deleteUser, getUsers, getRoles, updateUserStatus } from '../services/api';  // Ensure updateUserStatus is imported
import './UserManagement.css';

const UserManagement = () => {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('Active');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);  // Added state for users
  const roles = getRoles();

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getUsers();
      setUsers(userList);  // Update users state with fetched data
    };
    fetchUsers();
  }, []);  // Empty dependency array to run only once on component mount

  const handleAddUser = async () => {
    const response = await addUser(username, status, role);
    setMessage(response.message);

    // Reset input fields after submitting
    if (response.success) {
      setUsername('');      // Clear username input
      setStatus('Active');  // Reset to default status
      setRole('');          // Reset to "Select Role"
      const userList = await getUsers();  // Refresh users list
      setUsers(userList);  // Update users state
    }
  };

  const handleDeleteUser = async (username) => {
    const response = await deleteUser(username);
    setMessage(response.message);
    const userList = await getUsers();  // Refresh users list
    setUsers(userList);  // Update users state
  };

  const handleToggleStatus = async (username, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    const response = await updateUserStatus(username, newStatus);  // API call to update status
    setMessage(response.message);

    if (response.success) {
      // Update UI state directly if successful
      setUsers(users.map(user => user.username === username ? { ...user, status: newStatus } : user));
    }
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      <div className="form-container">
        <input
          className="input-field"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select className="select-field" onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select className="select-field" onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <button className="add-user-button" onClick={handleAddUser}>Add User</button>
        {message && <p className="message">{message}</p>}
      </div>

      <h3>Users List</h3>
      <div className="user-list">
        <ul>
          {users.map((user) => (
            <li key={user.username} className="user-item">
              {user.username} - {user.status} - {user.role}
              <button className="status-toggle-button" onClick={() => handleToggleStatus(user.username, user.status)}>
                Toggle Status
              </button>
              <button className="delete-button" onClick={() => handleDeleteUser(user.username)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
