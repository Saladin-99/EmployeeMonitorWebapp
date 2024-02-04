// AdminHome.jsx
import React, { useState } from "react";
import WebSocketCommon from './WebSocketCommon';
import WebSocketAdmin from './WebSocketAdmin';
import Table from './Table'; // Adjust the import path

const AdminHome = () => {
  const [employeeData, setEmployeeData] = useState([]);

  const handleAdminDataReceived = (data) => {
    // Handle admin-specific data
    setEmployeeData(data); // Update the employeeData state
  };

  return (
    <div>
      <WebSocketCommon/>
      <WebSocketAdmin
        onAdminDataReceived={handleAdminDataReceived}
      />

      {/* Render the Table component with employeeData */}
      <Table employeeData={employeeData} />

    </div>
  );
};

export default AdminHome;
