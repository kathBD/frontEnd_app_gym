import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      
      <div className="main-content" style={{ 
        flex: 1, 
        padding: '20px',
        marginLeft: '250px', 
        backgroundColor: '#f8f9fa'
      }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
