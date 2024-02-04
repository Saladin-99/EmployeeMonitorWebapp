// WebSocketCommon.jsx

import React, { useEffect } from 'react';
import socket from './WebSocketService';

const WebSocketCommon = ({User}) => {
  
  useEffect(() => {
    socket.connect();
    // Handle connect event
    socket.on('connect', () => {
      console.log('Connected to the WebSocket server');
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('Disconnected from the WebSocket server');
      socket.disconnect();
    });

    // Cleanup on component unmount
    return () => {
      
    };
  }, [User]);

  return null; // No rendering in this component
};

export default WebSocketCommon;
