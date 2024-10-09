import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TrainerDashboard = () => {
  const [trainings, setTrainings] = useState([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId"); // Get user ID from local storage

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/trainer/trainings/${userId}`);
        setTrainings(response.data);
      } catch (err) {
        setError("Failed to fetch trainings");
      }
    };

    fetchTrainings();
  }, [userId]);

  const handleEditScore = async (employeeId, newScore) => {
    try {
      await axios.put(`http://localhost:5000/api/trainer/score/${employeeId}`, { score: newScore });
      // Optionally, refresh the training data after editing the score
    } catch (err) {
      setError("Failed to update score");
    }
  };

  return (
    <div>
      <h1>Trainer Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {trainings.length > 0 ? (
        trainings.map(training => (
          <div key={training.id}>
            <h2>{training.name}</h2>
            <ul>
              {training.enrolledEmployees.map(employee => (
                <li key={employee.id}>
                  {employee.name} - Score: {employee.score}
                  {/* Add edit functionality here */}
                  <input
                    type="number"
                    placeholder="Edit Score"
                    onChange={(e) => handleEditScore(employee.id, e.target.value)}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No trainings assigned.</p>
      )}
    </div>
  );
};

export default TrainerDashboard;
