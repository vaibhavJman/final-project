import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Welcome from './Components/AdminDashboard';
import Trainers from './Components/trainers';
import Score from './Components/Score';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Signup />} />
        <Route path='/trainers' element= {<Trainers />} />
        <Route path="/score" element={<Score />} />
      </Routes>
    </Router>
  );
};

export default App;