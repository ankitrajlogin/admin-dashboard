import React, { useState } from 'react';
import { addRole, deleteRole, getRoles } from '../services/api';
import './RoleManagement.css';

const RoleManagement = () => {
  const [roleName, setRoleName] = useState('');
  const [message, setMessage] = useState('');
  const roles = getRoles();

  const handleAddRole = () => {
    const response = addRole(roleName);
    setMessage(response.message);

    // Reset input field after submitting
    if (response.success) {
      setRoleName('');  // Clear role input
    }
  };

  const handleDeleteRole = (role) => {
    const response = deleteRole(role);
    setMessage(response.message);
  };

  return (
    <div className="role-management-container">
      <h2>Role Management</h2>
      
      <div className="form-container">
        <input
          type="text"
          placeholder="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          className="role-input"
        />
        <button onClick={handleAddRole} className="add-role-btn">
          Add Role
        </button>
        {message && <p className="message">{message}</p>}
      </div>

      <h3>Roles List</h3>
      <div className="role-list">
        {roles.map((role) => (
          <div className="role-item" key={role}>
            {role}
            <button
              className="delete-btn"
              onClick={() => handleDeleteRole(role)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleManagement;
