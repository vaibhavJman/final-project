import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import Sidebar from "./Sidebar";
import { IoMdSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { BiUser, BiUserCheck, BiChalkboard } from "react-icons/bi"; 
import { FaUsers } from "react-icons/fa";
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
import EmpTable from "./EmpTable.jsx";
import GenderRatioChart from "./PieChart.jsx";

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [selectedDomain, setSelectedDomain] = useState("MACHINE_LEARNING");
  const [topEmployees, setTopEmployees] = useState([]);
  const [employeeCountSelection, setEmployeeCountSelection] = useState(5); 


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
    // Fetch data from the API
    fetch("http://localhost:5000/api/admin/table")
      .then((response) => response.json())
      .then((data) => {
        const sortedEmployees = data
          .sort((a, b) => b[selectedDomain] - a[selectedDomain])
          .slice(0, employeeCountSelection); 
        setTopEmployees(sortedEmployees);
      });
  }, [selectedDomain, employeeCountSelection]); 
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-2 bg-white border-b">
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
       
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
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

         
          <div className="flex gap-8 mb-8">
            <Card className="col-span-1 md:col-span-3 w-2/3">
              <CardHeader className="flex items-center">
                <CardTitle>
                  Top {employeeCountSelection} Employees in {selectedDomain}
                </CardTitle>
                <div className="flex items-center ml-4">
                  <label
                    htmlFor="count-select"
                    className="mr-2 text-sm font-medium"
                  >
                    Select Count:
                  </label>
                  <select
                    id="count-select"
                    className="border border-gray-300 text-sm p-1 rounded"
                    value={employeeCountSelection}
                    onChange={(e) =>
                      setEmployeeCountSelection(Number(e.target.value))
                    }
                  >
                    <option value={5}>Top 5</option>
                    <option value={10}>Top 10</option>
                    <option value={15}>Top 15</option>
                  </select>
                </div>
                <div className="flex items-center ml-4">
                  <label
                    htmlFor="domain-select"
                    className="mr-2 text-sm font-medium"
                  >
                    Select Domain:
                  </label>
                  <select
                    id="domain-select"
                    className="border border-gray-300 text-sm p-1 rounded"
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                  >
                    <option value="DATA_ENGINEERING">Data Engineering</option>
                    <option value="MACHINE_LEARNING">Machine Learning</option>
                    <option value="FULL_STACK">Full Stack</option>
                  </select>
                </div>
              </CardHeader>

              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={topEmployees}  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis />
                    <XAxis dataKey="fullName" />
                    <Tooltip />
                    <Bar
                      dataKey={selectedDomain}
                      stroke="#A855F7"
                      fill="#8884d8"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

           
            <Card className="col-span-1 md:col-span-3 w-1/3">
              <CardHeader>
                <CardTitle>Average Domain Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <GenderRatioChart />
              </CardContent>
            </Card>
          </div>

          <EmpTable />
        </main>
      </div>
    </div>
  );
}
