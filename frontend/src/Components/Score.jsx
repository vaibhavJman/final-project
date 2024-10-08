import { useState } from "react"; // Import useState
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

const Score = () => {
  const [activeNav, setActiveNav] = useState("score"); // Manage the active navigation state

  // Sample data for employees and their scores
  const employees = [
    {
      id: 1,
      fullName: "Alice Johnson",
      email: "alice@example.com",
      trainingScores: {
        DataScience: 85,
        FullStack: 90,
        DataEngineering: 80,
      },
      performanceMetrics: {
        ProblemSolving: 88,
        Leadership: 92,
        DataScience: 85,
      },
    },
    {
      id: 2,
      fullName: "Bob Smith",
      email: "bob@example.com",
      trainingScores: {
        DataScience: 78,
        FullStack: 85,
        DataEngineering: 82,
      },
      performanceMetrics: {
        ProblemSolving: 90,
        Leadership: 80,
        DataScience: 79,
      },
    },
    {
      id: 3,
      fullName: "Charlie Brown",
      email: "charlie@example.com",
      trainingScores: {
        DataScience: 92,
        FullStack: 88,
        DataEngineering: 91,
      },
      performanceMetrics: {
        ProblemSolving: 95,
        Leadership: 94,
        DataScience: 92,
      },
    },
    // Add more employees as needed
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="flex-grow p-6 bg-gray-100">
        <Card>
          <CardHeader>
            <CardTitle>Employee Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-center">Employee ID</TableHead>
                  <TableHead className="font-bold text-center">Name</TableHead>
                  <TableHead className="font-bold text-center">Email</TableHead>
                  <TableHead className="font-bold text-center">Data Science Score</TableHead>
                  <TableHead className="font-bold text-center">Full Stack Score</TableHead>
                  <TableHead className="font-bold text-center">Data Engineering Score</TableHead>
                  <TableHead className="font-bold text-center">Problem Solving Score</TableHead>
                  <TableHead className="font-bold text-center">Leadership Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id} className="h-[6vh]">
                    <TableCell className="font-medium text-center px-6 py-3 min-w-[120px]">
                      {employee.id}
                    </TableCell>
                    <TableCell className="font-medium text-center px-6 py-3 min-w-[150px]">
                      {employee.fullName}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]">
                      {employee.email}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]">
                      {employee.trainingScores.DataScience}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]"> 
                      {employee.trainingScores.FullStack}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]">
                      {employee.trainingScores.DataEngineering}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]">
                      {employee.performanceMetrics.ProblemSolving}
                    </TableCell>
                    <TableCell className="text-center px-6 py-3 min-w-[150px]">
                      {employee.performanceMetrics.Leadership}
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

export default Score;



// <Card>
// <CardHeader>
//   <CardTitle>Employee Training Status</CardTitle>
// </CardHeader>
// <CardContent>
//   <Table>
//     {/* <TableCaption>A list of employees and their training status.</TableCaption> */}
//     <TableHeader>
//       <TableRow>
//         <TableHead className="w-[200px] font-bold text-center ">
//           Employee ID
//         </TableHead>
//         <TableHead className="font-bold text-center">
//           Name
//         </TableHead>
//         <TableHead className="font-bold text-center">
//           Email
//         </TableHead>
//         <TableHead className="font-bold text-center">
//           Status
//         </TableHead>
//       </TableRow>
//     </TableHeader>
//     <TableBody>
//       {employees.map((employee) => (
//         <TableRow key={employee.id} className="h-[6vh]">
//           <TableCell className="font-medium text-center  px-6 py-3 min-w-[120px]">
//             {employee.id}
//           </TableCell>
//           <TableCell className="font-medium text-center px-6 py-3 min-w-[150px]">
//             {employee.fullName}
//           </TableCell>
//           <TableCell className="text-center px-6 py-3 min-w-[150px]">
//             {employee.email}
//           </TableCell>
//           <TableCell className="text-center  px-6 py-3 min-w-[150px]">
//             <span
//               className={`rounded-3xl px-4 py-2 ${getStatusClass(
//                 employee.trainingStatus
//               )}`}
//             >
//               {employee.trainingStatus}
//             </span>
//           </TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
// </CardContent>
// </Card>