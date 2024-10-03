// src/Welcome.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css'

const Welcome = () => {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check session status
    const sessionStatus = sessionStorage.getItem('sessionStatus');
    if (sessionStatus !== 'active') {
      navigate('/login');
      return;
    }

    // Retrieve user email from sessionStorage
    const email = sessionStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear session status and user email
    sessionStorage.removeItem('sessionStatus');
    sessionStorage.removeItem('userEmail');
    navigate('/login');
  };


  return (
    <div className='main'>
      <h2>Welcome{userEmail ? `, ${userEmail}` : ''}!</h2>
      <button className="submit"onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;
