import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Sidebar from "@/components/Sidebar"; // Adjust the path as necessary
import axios from "axios";

const TrainerDashboard = () => {
  const [activeNav, setActiveNav] = useState("trainings");
  const [trainings, setTrainings] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/trainer/trainings/${userId}`
        );
        setTrainings(response.data);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };

    fetchTrainings();
  }, [userId]);

  return (
    <div className="flex min-h-screen">
      {/* <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} /> */}

      <div className="flex-grow p-6 bg-gray-100">
        {/* Display Employees and Their Scores */}
        {trainings.length > 0 && (
          <Card className="mt-4">

            <CardContent>
              {trainings.map((training) => (
                <div key={training.id} className="mt-4">
                  <h3 className="text-lg font-semibold mb-10">Employees Enrolled in {training.name.toLowerCase().replace("_"," ")}</h3>
                  <Table>
                    <TableHeader>
                      <TableRow  className="h-[50px] text-center">
                        <TableHead className="font-bold text-center">
                          Employee ID
                        </TableHead>
                        <TableHead className="font-bold text-center">
                          Employee Name
                        </TableHead>
                        <TableHead className="font-bold text-center">
                          Email ID
                        </TableHead>
                        <TableHead className="font-bold text-center">
                          Score
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {training.assignedEmployees.map((employee) => (
                        <TableRow key={employee.employeeId}>
                          <TableCell className="text-center">
                            {employee.employeeId}
                          </TableCell>
                          <TableCell className="text-center">
                            {employee.employee.firstName}{" "}
                            {employee.employee.lastName}
                          </TableCell>
                          <TableCell className="text-center">
                            {employee.employee.email}
                          </TableCell>
                          <TableCell className="text-center">
                            {training.scores.find(
                              (score) =>
                                score.employeeId === employee.employeeId
                            )?.value || "No Score"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrainerDashboard;
