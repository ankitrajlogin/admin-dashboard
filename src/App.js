// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import PermissionManagement from './components/PermissionManagement';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<UserManagement />} /> {/* Set UserManagement as the default route */}
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/role-management" element={<RoleManagement />} />
        <Route path="/permission-management" element={<PermissionManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
