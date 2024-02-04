import React from "react";
import WebSocketCommon from './WebSocketCommon';

const EmployeeHome = () => {
  return (
    <div>
      <WebSocketCommon/>
      <p>Welcome employee, you are now online!</p>
    </div>
  )
};

export default EmployeeHome;
