import React from 'react';
import LogoutButton from './LogoutButton';

const Banner = ({ user }) => {
  return (
    <div className="banner">
      <img src="./newlogo.png" alt="my logo" className="banner-image" />
      <div className="banner-content">
        <p>Employee Monitoring Client</p>

        {/* Conditionally render LogoutButton when user is logged in */}
        {user && (
          <div id="logout-container">
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
