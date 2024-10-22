import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Welcome from './Components/AdminDashboard';
import Trainers from './Components/Trainers';
import Training from './Components/Trainings';
import TrainerDashboard from './Components/TrainerDashboard';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Login />} />
        <Route path='/trainers' element= {<Trainers />} />
        <Route path="/training" element={<Training />} />
        <Route path="/trainer/dashboard" element={< TrainerDashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;