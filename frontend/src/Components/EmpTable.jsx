
import React, { useState, useEffect } from 'react';
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
  // Optional: If fetching data via API, you could set up state here
  const [data, setData] = useState([]);
  console.log(data);
  
  useEffect(() => {
    // Example API call logic if fetching from the backend
    fetch('http://localhost:5000/api/admin/table')
      .then((response) => response.json())
      .then((data) => setData(data));
    // In this case, we just use the static data provided above:
    // setData(employees);
  }, []);

  return (




    
    <div className="container mx-auto py-6">

      
    {/* <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">#</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">DATA_ENGINEERING</th>
            <th scope="col" className="px-6 py-3">MACHINE_LEARNING</th>
            <th scope="col" className="px-6 py-3">FULL_STACK</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((employee, index) => (
              <tr
                key={employee.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <td className="px-6 py-4">{ employee.email.split('.')[0]}</td>
                <td className="px-6 py-4">{employee.email}</td>
                <td className="px-6 py-4">{employee.DATA_ENGINEERING}</td>
                <td className="px-6 py-4">{employee.MACHINE_LEARNING}</td>
                <td className="px-6 py-4">{employee.FULL_STACK}</td>
              </tr>
            ))
            ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center">
                No data available.
              </td>
            </tr>
            )
          }
        </tbody>
      </table>
    </div>
 */}


    <Card>
            <CardHeader>
              <CardTitle>Employee Domain-Specific Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Data Engineering</TableHead>
                    <TableHead>Data Science</TableHead>
                    <TableHead>Full Stack</TableHead>

                  </TableRow>
                </TableHeader>
                <TableBody>
                  
                  {data.map((employee) => (
                    <TableRow key={employee.id}>
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
  )
}

export default EmpTable

