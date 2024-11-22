import React, { useState } from 'react';
import { getPermissions, updatePermissions } from '../services/api';
import './PermissionManagement.css'; // Import the CSS file

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState(getPermissions());
  const [message, setMessage] = useState('');

  const handlePermissionChange = (role, permission, value) => {
    const updatedPermissions = permissions.map((item) =>
      item.role === role
        ? { ...item, permission: { ...item.permission, [permission]: value } }
        : item
    );
    setPermissions(updatedPermissions);

    // Update in API
    const response = updatePermissions(role, updatedPermissions.find(item => item.role === role).permission);
    setMessage(response.message);
  };

  return (
    <div className="permission-management-container">
      <h2 className="title">Permission Management</h2>
      <p className="message">{message}</p>
      <h3 className="permissions-heading">Permissions</h3>
      <div className="permissions-list">
        {permissions.map((item) => (
          <div key={item.role} className="role-container">
            <h4 className="role-name">{item.role}</h4>
            <div className="permission-row">
              <div className="permission">
                <label className="permission-label">
                  Read
                  <input
                    type="checkbox"
                    checked={item.permission.read}
                    onChange={(e) => handlePermissionChange(item.role, 'read', e.target.checked)}
                    className="permission-checkbox"
                  />
                </label>
              </div>
              <div className="permission">
                <label className="permission-label">
                  Write
                  <input
                    type="checkbox"
                    checked={item.permission.write}
                    onChange={(e) => handlePermissionChange(item.role, 'write', e.target.checked)}
                    className="permission-checkbox"
                  />
                </label>
              </div>
              <div className="permission">
                <label className="permission-label">
                  Edit
                  <input
                    type="checkbox"
                    checked={item.permission.edit}
                    onChange={(e) => handlePermissionChange(item.role, 'edit', e.target.checked)}
                    className="permission-checkbox"
                  />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionManagement;
