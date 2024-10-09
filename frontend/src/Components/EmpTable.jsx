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
  console.log(data);
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/table")
      .then((response) => response.json())
      .then((data) => setData(data));

    // setData(employees);
  }, []);

  return (
    <div className="container mx-auto min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Employee Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table >
            <TableHeader className="h-[60px]">
              <TableRow>
                <TableHead className="font-bold  text-center">
                  Employee ID
                </TableHead>
                <TableHead className="font-bold  text-center">
                  Employee
                </TableHead>
                <TableHead className="font-bold  text-center">Email</TableHead>
                <TableHead className="font-bold  text-center">
                  Data Engineering
                </TableHead>
                <TableHead className="font-bold  text-center">
                  Data Science
                </TableHead>
                <TableHead className="font-bold  text-center">
                  Full Stack
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((employee) => (
                <TableRow key={employee.id} className="h-[50px] text-center ">
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.fullName}</TableCell>
                  {/* <TableCell>{employee.email.split('.')[0]}</TableCell> */}
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
