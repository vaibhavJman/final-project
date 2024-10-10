import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const EmpTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/table")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const filteredData = data.filter(employee => {
    const fullName = employee.fullName.toLowerCase();
    const employeeId = employee.id.toString();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      employeeId.includes(searchTerm)
    );
  });

  return (
    <div className="container mx-auto min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Employee Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <Table>
            <TableHeader className="h-[60px]">
              <TableRow>
                <TableHead className="font-bold text-center">Employee ID</TableHead>
                <TableHead className="font-bold text-center">Employee</TableHead>
                <TableHead className="font-bold text-center">Email</TableHead>
                <TableHead className="font-bold text-center">Data Engineering</TableHead>
                <TableHead className="font-bold text-center">Data Science</TableHead>
                <TableHead className="font-bold text-center">Full Stack</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((employee) => (
                <TableRow key={employee.id} className="h-[50px] text-center">
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.fullName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.DATA_ENGINEERING}</TableCell>
                  <TableCell>{employee.MACHINE_LEARNING}</TableCell>
                  <TableCell>{employee.FULL_STACK}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmpTable;
