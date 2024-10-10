import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
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
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</header>


        {/* Main Content */}
        <main className="flex-grow p-6 bg-gray-100">
          {trainings.length > 0 && (
            <Card className="mt-4">
              <CardContent>
                {trainings.map((training) => (
                  <div key={training.id} className="mt-4">
                    <h3 className="text-lg font-semibold mb-10">
                      Employees Enrolled in{" "}
                      {training.name.toLowerCase().replace("_", " ")}
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow className="h-[70px] text-center">
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
                          <TableRow
                            key={employee.employeeId}
                            className="h-[50px] text-center"
                          >
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
        </main>
      </div>
  );
};

export default TrainerDashboard;
