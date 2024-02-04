// WebSocketAdmin.jsx

import React, { useEffect } from 'react';
import socket from './WebSocketService';

const WebSocketAdmin = ({onAdminDataReceived} ) => {
  useEffect(() => {

    // Handle 'employee_status_changed' event
    socket.on('employee_status_changed', (data) => {
      console.log('Received employee status changed:', data);
      onAdminDataReceived(data); // Notify the parent component about admin data
    });

    // Call the onDisconnect provided by WebSocketCommon
    return () => {
    };
  }, [onAdminDataReceived]);

  return null; // No rendering in this component
};

export default WebSocketAdmin;
