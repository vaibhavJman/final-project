import { useState } from "react";
import { ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import Sidebar from "./Sidebar";
import { IoMdSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");

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
    {
      id: 4,
      fullName: "Steve Rogers",
      email: "steve@example.com",
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
    {
      id: 5,
      fullName: "Sam Wilson",
      email: "sam@example.com",
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
    {
      id: 6,
      fullName: "Samuel Stark",
      email: "samuel@example.com",
      trainingScores: {
        DataScience: 92,
        FullStack: 88,
        DataEngineering: 91,
      },
      performanceMetrics: {
        ProblemSolving: 89,
        Leadership: 64,
        DataScience: 99,
      },
    },
  ];

  const jobPerformanceMetrics = [
    { metric: "DataEngineering", score: 4 },
    { metric: "DataScience", score: 3 },
    { metric: "FullStack", score: 4 },
    { metric: "ProblemSolving", score: 4 },
    { metric: "Leadership", score: 5 },
  ];

  const topEmployees = employees.sort((a, b) => b.performanceMetrics.ProblemSolving - a.performanceMetrics.ProblemSolving).slice(0, 5);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  const getColor = (name) => {
    switch (name) {
      case "DataEngineering":
        return "#fe89d8";
      case "DataScience":
        return "#da88dc";
      case "FullStack":
        return "#b786e0";
      case "ProblemSolving":
        return "#7084e7";
      case "Leadership":
        return "#9385e3";
      default:
        return "#000"; // fallback to black if name doesn't match
    }
  };

  const COLORS = ["#fe89d8", "#da88dc", "#b786e0", "#9385e3", "#7084e7"];
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const metricColor = getColor(payload[0].name); // Get the color for the corresponding metric
      return (
        <div className="bg-gray-800 text-white rounded-lg p-2">
          <div className="flex items-center">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: metricColor,
                marginRight: "8px",
              }}
            ></span>
            <span style={{ marginRight: "30px" }}>{payload[0].name}:</span>
            <span className="ml-auto">{payload[0].value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <FaBell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="ml-4">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {/* KPI Cards */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {[{ title: "Average Scores", value: "92%", change: "+5%" }].map(
              (kpi, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {kpi.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {kpi.change} from last month
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>

          {/* Charts Section */}
          <div className="flex gap-8 mb-8">
            <Card className="col-span-1 md:col-span-3 w-2/3">
              <CardHeader>
                <CardTitle>Top 5 Employees Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={topEmployees}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fullName" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="performanceMetrics.ProblemSolving" stroke="#A855F7" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart for Job Performance Metrics */}
            <Card className="col-span-1 md:col-span-3 w-1/3">
              <CardHeader>
                <CardTitle>Training Domains</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={jobPerformanceMetrics}
                      dataKey="score"
                      nameKey="metric"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                    >
                      {jobPerformanceMetrics.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      wrapperStyle={{ color: "black" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Employee Scores Table */}
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
                    <TableRow key={employee.id}>
                      <TableCell className="text-center">{employee.id}</TableCell>
                      <TableCell className="text-center">{employee.fullName}</TableCell>
                      <TableCell className="text-center">{employee.email}</TableCell>
                      <TableCell className="text-center">{employee.trainingScores.DataScience}</TableCell>
                      <TableCell className="text-center">{employee.trainingScores.FullStack}</TableCell>
                      <TableCell className="text-center">{employee.trainingScores.DataEngineering}</TableCell>
                      <TableCell className="text-center">{employee.performanceMetrics.ProblemSolving}</TableCell>
                      <TableCell className="text-center">{employee.performanceMetrics.Leadership}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
