import React, { useEffect, useState } from 'react';
import EmployeeHome from '../components/EmployeeHome';
import AdminHome from '../components/AdminHome';
import Banner from '../components/Banner';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/current_user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          credentials: 'include',
        });

        if (response.ok) {
          const employee = await response.json();
          setUser(employee);
        } else {
          console.error("Fetching current user failed");
        }
      } catch (error) {
        console.error("Error during fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // Define your styles here
  const containerStyle = {
    boxSizing: 'border-box',
    paddingTop: '8vh'
    // Add more styles as needed
  };

  return (
    <div style={containerStyle} className="login-container">
      <Banner user={user} />

      {user && user.isAdmin === 1 && <AdminHome />}

      {user && user.isAdmin === 0 && <EmployeeHome />}
    </div>
  );
};

export default Home;
