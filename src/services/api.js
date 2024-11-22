// api.js

// Mock Databases using Sets for uniqueness
let users = new Set([
  { username: 'john_doe', status: 'Active', role: 'Admin' },
  { username: 'jane_smith', status: 'Inactive', role: 'Editor' },
  { username: 'alice_williams', status: 'Active', role: 'Viewer' },
  { username: 'bob_martin', status: 'Active', role: 'Manager' },  // New user with Manager role
  { username: 'charlie_brown', status: 'Inactive', role: 'Guest' }, // New user with Guest role
]); // Default users

// Define default permissions for each role
const defaultPermissions = {
  Admin: { read: true, write: true, edit: true },
  Editor: { read: true, write: true, edit: false },
  Viewer: { read: true, write: false, edit: false },
  Manager: { read: true, write: true, edit: true }, // Manager role with full permissions
  Guest: { read: true, write: false, edit: false }, // Guest role with only read permission
};

let roles = new Set(['Admin', 'Editor', 'Viewer', 'Manager', 'Guest']); // Default roles with new Manager and Guest roles
const permissions = new Map(); // Storing permissions by role

// Initialize permissions for each role
roles.forEach((role) => {
  permissions.set(role, defaultPermissions[role]);
});

// Utility functions for handling data

// User Operations
export const addUser = (username, status, role) => {
  if (!username || !status || !role) {
    return { success: false, message: "All fields are required!" };
  }

  // Check if username already exists
  if (Array.from(users).some(user => user.username === username)) {
    return { success: false, message: "Username already exists!" };
  }

  const newUser = { username, status, role };
  users.add(newUser);
  return { success: true, message: "User added successfully!" };
};

export const updateUserStatus = (username, newStatus) => {
  // Mock API call to update user status
  const response = {
    success: true,
    message: `User ${username}'s status has been updated to ${newStatus}.`
  };
  return response;
};

export const deleteUser = (username) => {
  const userToDelete = Array.from(users).find(user => user.username === username);
  if (!userToDelete) {
    return { success: false, message: "User not found!" };
  }
  users.delete(userToDelete);
  return { success: true, message: "User deleted successfully!" };
};

// Role Operations
export const addRole = (roleName) => {
  if (!roleName) {
    return { success: false, message: "Role name is required!" };
  }

  // Check if role already exists
  if (roles.has(roleName)) {
    return { success: false, message: "Role already exists!" };
  }

  // Add a role with default permissions set to false
  roles.add(roleName);
  permissions.set(roleName, { read: false, write: false, edit: false });
  return { success: true, message: "Role added successfully!" };
};

export const deleteRole = (roleName) => {
  // Check if role is assigned to any user before deleting
  const isRoleAssigned = Array.from(users).some(user => user.role === roleName);
  if (isRoleAssigned) {
    return { success: false, message: "Cannot delete role. It is assigned to a user!" };
  }

  roles.delete(roleName);
  permissions.delete(roleName);
  return { success: true, message: "Role deleted successfully!" };
};

// Permission Operations
export const getPermissions = () => {
  return Array.from(permissions.entries()).map(([role, permission]) => ({
    role,
    permission,
  }));
};

export const updatePermissions = (roleName, newPermissions) => {
  if (!permissions.has(roleName)) {
    return { success: false, message: "Role not found!" };
  }

  permissions.set(roleName, newPermissions);
  return { success: true, message: "Permissions updated successfully!" };
};

// Helper to get all users, roles, and permissions for frontend display
export const getUsers = () => {
  return Array.from(users);
};

export const getRoles = () => {
  return Array.from(roles);
};
