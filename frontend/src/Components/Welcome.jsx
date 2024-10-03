import { useState } from 'react'
import { Bar, BarChart, ResponsiveContainer,CartesianGrid, Tooltip, XAxis,YAxis } from 'recharts'
import { Bell, ChevronDown, Layout, Users, BarChart as BarChartIcon, FileText, Settings } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')


  const performanceData = [
    { month: 'Jan', performance: 80 },
    { month: 'Feb', performance: 75 },
    { month: 'Mar', performance: 85 },
    { month: 'Apr', performance: 90 },
    { month: 'May', performance: 88 },
    { month: 'Jun', performance: 95 },
    { month: 'Jul', performance: 97 },
    { month: 'Aug', performance: 86 },
    { month: 'Sep', performance: 70 },
    { month: 'Oct', performance: 90 },
    { month: 'Nov', performance: 75 },
    { month: 'Dec', performance: 80 },
  ]

  const recentActivities = [
    { id: 1, activity: 'Completed project milestone', date: '2 hours ago' },
    { id: 2, activity: 'Attended team meeting', date: '1 day ago' },
    { id: 3, activity: 'Submitted quarterly report', date: '3 days ago' },
    { id: 4, activity: 'Completed training course', date: '1 week ago' },
  ]

  return (
    
    <div className="flex h-screen bg-blue-100">


      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-semibold">PerformancePro</h1>
        </div>
        <nav className="flex-grow">
          {[
            { name: 'Dashboard', icon: Layout },
            { name: 'Team', icon: Users },
            { name: 'Score', icon: BarChartIcon },
            { name: 'Perfomrance', icon: FileText },
          ].map((item) => (
            <button
              key={item.name}
              className={`flex items-center w-full px-4 py-2 text-left ${
                activeNav === item.name.toLowerCase() ? 'bg-blue-200' : 'hover:bg-blue-50'
              }`}
              onClick={() => setActiveNav(item.name.toLowerCase())}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b ">
          <h2 className="text-xl font-semibold">Employee Dashboard</h2>
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="ml-4">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" className="ml-2 " >
              John Doe <ChevronDown   className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Main content */}


        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {/* KPI Cards */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Performance Score', value: '92%', change: '+5%' },
              { title: 'Tasks Completed', value: '28', change: '+3' },
              { title: 'Team Ranking', value: '3rd', change: '+2' },
              { title: 'Goals Achieved', value: '8/10', change: '+1' },
            ].map((kpi, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
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

          {/* Performance Chart */}
          <Card className="mb-8">
  <CardHeader>
    <CardTitle>Monthly Performance</CardTitle>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={performanceData}>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="0.5">
            <stop offset="0%" stopColor="#8E2DE2" stopOpacity={1} />
            <stop offset="100%" stopColor="#4A00E0" stopOpacity={1} />
          </linearGradient>
        </defs>
        
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip wrapperStyle={{ backgroundColor: '#ccc', outline: "none" }} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        
        <Bar dataKey="performance" fill="url(#colorGradient)" radius={[20, 20, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </CardContent>
</Card>


          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.activity}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  

)
}