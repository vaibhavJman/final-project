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
import CardComponent from "./CardComponent";
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
  const [employeeCount, setEmployeeCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [trainerCount, setTrainerCount] = useState(0);
  const [trainingCount, setTrainingCount] = useState(0);

  const [isLoad, setisLoad] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
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
        setTrainings(response.data);
        setisLoad(false);
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

      setTrainings((prev) =>
        prev.map((training) => ({
          ...training,
          scores: training.scores.map((score) =>
            score.id === scoreId ? { ...score, value: editing.value } : score
          ),
        }))
      );
      setEditing({ scoreId: null, value: "" });
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  if (isLoad) {
    return <h1>Loading.....</h1>;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-screen">
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

      <main className="flex-grow p-6 bg-gray-100">
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <CardComponent
            bgColor="bg-red-100"
            icon={MdAssignmentTurnedIn}
            iconColor="text-red-600"
            titleSize="text-lg"
            value={trainings[0].name.toLowerCase().replace("_", " ")}
            description="Assigned Training"
          />

          <CardComponent
            bgColor="bg-blue-100"
            icon={BiUser}
            titleSize="text-4xl"
            iconColor="text-blue-600"
            title="Employees"
            value={employeeCount}
            description="Total Employees"
          />

          <CardComponent
            bgColor="bg-green-100"
            icon={BiUserCheck}
            titleSize="text-4xl"
            iconColor="text-green-600"
            title="Admins"
            value={adminCount}
            description="Total Admins"
          />
          <CardComponent
            bgColor="bg-orange-100"
            icon={FaUsers}
            titleSize="text-4xl"
            iconColor="text-orange-600"
            title="Trainers"
            value={trainerCount}
            description="Total Trainers"
          />
          <CardComponent
            bgColor="bg-purple-100"
            icon={BiChalkboard}
            titleSize="text-4xl"
            iconColor="text-purple-600"
            title="Trainings"
            value={trainingCount}
            description="Total Trainings"
          />
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
                            // <Button
                            //   onClick={() => handleSave(score.id)}
                            //   variant="primary"
                            // >
                            //   Save
                            // </Button>
                            <>
                              <Button
                                onClick={() => handleSave(score.id)}
                                variant="primary"
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() =>
                                  setEditing({ scoreId: null, value: "" })
                                }
                                variant="secondary"
                                // className="ml-2"
                              >
                                Cancel
                              </Button>
                            </>
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
