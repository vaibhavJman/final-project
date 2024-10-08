import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Sidebar from "@/components/Sidebar"; 
import axios from "axios"; 

const Training = () => {
  const [activeNav, setActiveNav] = useState("score"); 
  const [trainings, setTrainings] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/trainings"); 
        setTrainings(response.data);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };

    fetchTrainings();
  }, []);

  const filteredTrainings = trainings.filter((training) => {
    return (
      training.id.toString().includes(searchTerm) ||
      training.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="flex-grow p-6 bg-gray-100">
        <Card>
          <CardHeader>
            <CardTitle>Trainings List</CardTitle>
            {/* Search Input */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search by ID or Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-center">Training ID</TableHead>
                  <TableHead className="font-bold text-center">Name</TableHead>
                  <TableHead className="font-bold text-center">Domain Name</TableHead>
                  <TableHead className="font-bold text-center">Start Date</TableHead>
                  <TableHead className="font-bold text-center">No. of Assigned Employees</TableHead>
                  <TableHead className="font-bold text-center">Trainer Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrainings.map((training) => (
                  <TableRow key={training.id} className="h-[6vh]">
                    <TableCell className="font-medium text-center px-6 py-3 min-w-[120px]">
                      {training.id}
                    </TableCell>
                    <TableCell className="font-medium text-center px-6 py-3 min-w-[150px]">
                      {training.name.replace("_"," ")}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]">
                      {training.domainName.replace("_"," ")}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]">
                      {new Date(training.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]">
                      {training.assignedEmployees}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]">
                      {training.trainerName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Training;
