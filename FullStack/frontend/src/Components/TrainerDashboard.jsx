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
import { Button } from "@/components/ui/button";
import { BiUser, BiUserCheck, BiChalkboard } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";

const TrainerDashboard = () => {
  const [trainings, setTrainings] = useState([]);
  const [editing, setEditing] = useState({ scoreId: null, value: "" });
  const userId = localStorage.getItem("userId");
  const [employeeCount, setEmployeeCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [trainerCount, setTrainerCount] = useState(0);
  const [trainingCount, setTrainingCount] = useState(0);

  useEffect(() => {
    // Fetch data for counts
    const fetchCounts = async () => {
      const [employeeRes, adminRes, trainerRes, trainingRes] =
        await Promise.all([
          fetch("http://localhost:5000/api/admin/employeeCount"),
          fetch("http://localhost:5000/api/admin/adminCount"),
          fetch("http://localhost:5000/api/admin/trainerCount"),
          fetch("http://localhost:5000/api/admin/trainingCount"),
        ]);
      // console.log(employeeRes.count)
      const employeeData = await employeeRes.json();
      const adminData = await adminRes.json();
      const trainerData = await trainerRes.json();
      const trainingData = await trainingRes.json();

      setEmployeeCount(employeeData.count);
      setAdminCount(adminData.count);
      setTrainerCount(trainerData.count);
      setTrainingCount(trainingData.count);
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchTrainings = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://localhost:5000/api/trainer/trainings/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data[0].name);
        setTrainings(response.data);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };

    fetchTrainings();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  const handleEdit = (scoreId, currentValue) => {
    setEditing({ scoreId, value: currentValue });
  };

  const handleSave = async (scoreId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/trainer/update-score/${scoreId}`,
        { value: editing.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTrainings((prev)  =>
        prev.map((training) => ({
          ...training,
          scores: training.scores.map((score) =>
            score.id === scoreId ? { ...score, value: editing.value } : score
          ),
        }))
      );
      setEditing({ scoreId: null, value: "" }); // Reset editing state
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header Bar */}
      <header className="flex items-center justify-between px-6 py-2 bg-white border-b">
        <h2 className="text-xl font-semibold">Trainer Dashboard</h2>
        <div className="flex items-center">
          <Button variant="ghost" size="icon">
            <FaBell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none focus:ring-0">
              <Avatar className="focus:outline-none focus:ring-0">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="focus:outline-none focus:ring-0 focus:border-0">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => console.log("View Profile")}>
                <IoMdSettings className="mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100">
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-lg transition-transform duration-300 transform hover:scale-105 bg-red-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <MdAssignmentTurnedIn className="text-5xl text-red-600" />
              <CardTitle className="text-lg">
                {trainings.map((training) =>
                  training.name.toLowerCase().replace("_", " ")
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-700">Assigned Training</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg transition-transform duration-300 transform hover:scale-105 bg-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <BiUser className="text-5xl text-blue-600" />
              <CardTitle className="text-4xl">{employeeCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-700">Total Employees</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg transition-transform duration-300 transform hover:scale-105 bg-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <BiUserCheck className="text-5xl text-green-600" />
              <CardTitle className="text-4xl">{adminCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-700">Total Admins</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg transition-transform duration-300 transform hover:scale-105 bg-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <FaUsers className="text-5xl text-orange-600" />
              <CardTitle className="text-4xl">{trainerCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-700">Total Trainers</div>
            </CardContent>
          </Card>
          <Card className="shadow-lg transition-transform duration-300 transform hover:scale-105 bg-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <BiChalkboard className="text-5xl text-purple-600" />
              <CardTitle className="text-4xl">{trainingCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-gray-700">Total Trainings</div>
            </CardContent>
          </Card>
        </div>

        {trainings.map((training) => (
          <Card key={training.id} className="mt-4">
            <CardContent>
              <h3 className="text-lg font-semibold mb-6 mt-6">
                Employees Enrolled in {training.name.replace("_", " ")}
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {training.assignedEmployees.map((emp) => {
                    const score = training.scores.find(
                      (s) => s.employeeId === emp.employeeId
                    );

                    return (
                      <TableRow key={emp.employeeId}>
                        <TableCell>{emp.employeeId} </TableCell>
                        <TableCell>
                          {emp.employee.firstName} {emp.employee.lastName}
                        </TableCell>
                        <TableCell>{emp.employee.email}</TableCell>
                        <TableCell>
                          {editing.scoreId === score?.id ? (
                            <input
                              type="number"
                              value={editing.value}
                              onChange={(e) =>
                                setEditing({
                                  ...editing,
                                  value: e.target.value,
                                })
                              }
                              className="border rounded p-1 w-20"
                            />
                          ) : (
                            score?.value || "No Score"
                          )}
                        </TableCell>
                        <TableCell>
                          {editing.scoreId === score?.id ? (
                            <Button
                              onClick={() => handleSave(score.id)}
                              variant="primary"
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              onClick={() =>
                                handleEdit(score?.id, score?.value)
                              }
                              variant="secondary"
                            >
                              Edit
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default TrainerDashboard;
