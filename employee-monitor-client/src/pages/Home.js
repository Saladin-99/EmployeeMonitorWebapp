import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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

  return (
    <div>
      <Banner user={user} />
  
      {user && (
        <Routes>
          {user.isAdmin === 1 ? (
            <Route path="/" element={<AdminHome />} />
          ) : (
            <Route path="/" element={<EmployeeHome />} />
          )}
        </Routes>
      )}
    </div>
  );
  
};

export default Home;
