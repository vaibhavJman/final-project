import { useState } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  Bell,
  ChevronRight,
  Layout,
  Users,
  BarChart as BarChartIcon,
  FileText,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [selectedMonth, setSelectedMonth] = useState("May");
  const [selectedYear, setSelectedYear] = useState("2024");

  const performanceData = [
    { month: "Jan", performance: 80 },
    { month: "Feb", performance: 75 },
    { month: "Mar", performance: 85 },
    { month: "Apr", performance: 90 },
    { month: "May", performance: 88 },
    { month: "Jun", performance: 95 },
    { month: "Jul", performance: 97 },
    { month: "Aug", performance: 86 },
    { month: "Sep", performance: 70 },
    { month: "Oct", performance: 90 },
    { month: "Nov", performance: 75 },
    { month: "Dec", performance: 80 },
  ];

  const jobPerformanceMetrics = [
    { metric: "DataEngineering", score: 4 },
    { metric: "DataScience", score: 3 },
    { metric: "FullStack", score: 4 },
    { metric: "ProblemSolving", score: 4 },
    { metric: "Leadership", score: 5 },
  ];

  const barChartData = [
    {
      month: "Jan",
      DataEngineering: 4,
      DataScience: 3,
      FullStack: 4,
      Leadership: 3,
      ProblemSolving: 5,
    },
    {
      month: "Feb",
      DataEngineering: 3,
      DataScience: 2,
      FullStack: 4,
      Leadership: 4,
      ProblemSolving: 3,
    },
    {
      month: "Mar",
      DataEngineering: 4,
      DataScience: 3,
      FullStack: 4,
      Leadership: 3,
      ProblemSolving: 4,
    },
    {
      month: "Apr",
      DataEngineering: 4,
      DataScience: 3,
      FullStack: 4,
      Leadership: 5,
      ProblemSolving: 2,
    },
    {
      month: "May",
      DataEngineering: 4,
      DataScience: 3,
      FullStack: 2,
      Leadership: 3,
      ProblemSolving: 5,
    },
    {
      month: "Jun",
      DataEngineering: 4,
      DataScience: 3,
      FullStack: 4,
      Leadership: 3,
      ProblemSolving: 5,
    },
    {
      month: "Jul",
      DataEngineering: 3,
      DataScience: 2,
      FullStack: 4,
      Leadership: 4,
      ProblemSolving: 3,
    },
    {
      month: "Aug",
      DataEngineering: 4,
      DataScience: 3,
      FullStack: 4,
      Leadership: 3,
      ProblemSolving: 4,
    },
    {
      month: "Sep",
      DataEngineering: 4,
      DataScience: 3,
      FullStack: 4,
      Leadership: 5,
      ProblemSolving: 2,
    },
    {
      month: "Oct",
      DataEngineering: 4,
      DataScience: 3,
      FullStack: 2,
      Leadership: 3,
      ProblemSolving: 5,
    },
    {
      month: "Nov",
      DataEngineering: 4,
      DataScience: 3,
      FullStack: 4,
      Leadership: 3,
      ProblemSolving: 5,
    },
    {
      month: "Dec",
      DataEngineering: 3,
      DataScience: 2,
      FullStack: 4,
      Leadership: 4,
      ProblemSolving: 3,
    },
  ];

  const employees = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      trainingStatus: "Assigned",
      score: 88,
    },
    {
      id: 2,
      fullName: "Jane Smith",
      email: "jane@example.com",
      trainingStatus: "Not Assigned",
      score: 75,
    },
    {
      id: 3,
      fullName: "Mark Johnson",
      email: "mark@example.com",
      trainingStatus: "Assigned",
      score: 92,
    },
    {
      id: 4,
      fullName: "Emily Davis",
      email: "emily@example.com",
      trainingStatus: "Not Assigned",
      score: 80,
    },
    {
      id: 4,
      fullName: "Steve Rogers",
      email: "steve@example.com",
      trainingStatus: "Assigned",
      score: 90,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Assigned":
        return "bg-green-100 text-green-600 ";
      case "Not Assigned":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
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
      // console.log(payload)
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
            <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
            {/* <span style={{ marginRight: "30px" }}>{payload[0].name}:</span>
            <span className="ml-auto">{payload[0].value}</span> */}
          </div>
        </div>
      );
    }
    return null;
  };

  const topEmployees = employees.sort((a, b) => b.score - a.score).slice(0, 5); // Get the top 5 employees by score

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-semibold">PerformancePro</h1>
        </div>
        <nav className="flex-grow">
          {[
            { name: "Dashboard", icon: Layout },
            { name: "Team", icon: Users },
            { name: "Score", icon: BarChartIcon },
            { name: "Performance", icon: FileText },
          ].map((item) => (
            <button
              key={item.name}
              className={`flex items-center w-full px-4 py-2 text-left text-sm ${
                activeNav === item.name.toLowerCase()
                  ? "bg-purple-200"
                  : "hover:bg-purple-100"
              }`}
              onClick={() => setActiveNav(item.name.toLowerCase())}
            >
              <item.icon className="w-5 h-5 mr-3 fill-current " />{" "}
              {/* Ensure the icon is filled */}
              {item.name}
              <ChevronRight className="ml-auto" /> {/* Add right chevron */}
              {/* {item.name} */}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
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
                  <Settings className="mr-2" />
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
          {/* Month and Year Filters */}
          <div className="flex mb-4 space-x-4">
            <select
              className="border rounded p-2"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {performanceData.map((data) => (
                <option key={data.month} value={data.month}>
                  {data.month}
                </option>
              ))}
            </select>
            <select
              className="border rounded p-2"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {["2021", "2022", "2023", "2024"].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Performance Score", value: "92%", change: "+5%" },
              { title: "Tasks Completed", value: "28", change: "+3" },
              { title: "Team Ranking", value: "3rd", change: "+2" },
              { title: "Goals Achieved", value: "8/10", change: "+1" },
            ].map((kpi, index) => (
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
            ))}
          </div>

          {/* Charts Section */}
          <div className="flex gap-8 mb-8">
            {/* <Card className="col-span-1 md:col-span-3 w-2/3">
              <CardHeader>
                <CardTitle>Employees Performance Overtime</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fe89d8" stopOpacity={1} />
                        <stop offset="100%" stopColor="#7084e7" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="performance" stroke="#A855F7" fill="url(#colorGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card> */}

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
                    <Legend />
                    <Bar dataKey="score" fill="#A855F7" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Radar Chart  */}
            {/*  
            <Card className="col-span-1 md:col-span-3 w-1/3">
              <CardHeader>
                <CardTitle>Job Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart outerRadius={90} data={jobPerformanceMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis />
                    <Tooltip formatter={(value) => [value, "Score"]} />
                    <Radar name="Score" dataKey="score" stroke="#7084e7" fill="url(#colorGradient)" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card> */}

            {/* Pie Chart for Job Performance Metrics */}
            <Card className="col-span-1 md:col-span-3 w-1/3">
              <CardHeader>
                <CardTitle>Job Performance Metrics</CardTitle>
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
                      wrapperStyle={{ color: "black" }} // Change legend text color to black
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Bar Chart */}
          {/* <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Bar Chart for Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 6]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: 'black' }} /> 
                    <Bar dataKey="DataEngineering" fill="#fe89d8" />
                    <Bar dataKey="DataScience" fill="#da88dc" />
                    <Bar dataKey="FullStack" fill="#b786e0" />
                    <Bar dataKey="Leadership" fill="#9385e3" />
                    <Bar dataKey="ProblemSolving" fill="#7084e7" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div> */}

          {/* Employee Training Status Table */}
          <Card>
            <CardHeader>
              <CardTitle>Employee Training Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                {/* <TableCaption>A list of employees and their training status.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] font-bold text-center ">
                      Employee ID
                    </TableHead>
                    <TableHead className="font-bold text-center">
                      Name
                    </TableHead>
                    <TableHead className="font-bold text-center">
                      Email
                    </TableHead>
                    <TableHead className="font-bold text-center">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id} className="h-[6vh]">
                      <TableCell className="font-medium text-center  px-6 py-3 min-w-[120px]">
                        {employee.id}
                      </TableCell>
                      <TableCell className="font-medium text-center px-6 py-3 min-w-[150px]">
                        {employee.fullName}
                      </TableCell>
                      <TableCell className="text-center px-6 py-3 min-w-[150px]">
                        {employee.email}
                      </TableCell>
                      <TableCell className="text-center  px-6 py-3 min-w-[150px]">
                        <span
                          className={`rounded-3xl px-4 py-2 ${getStatusClass(
                            employee.trainingStatus
                          )}`}
                        >
                          {employee.trainingStatus}
                        </span>
                      </TableCell>
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
