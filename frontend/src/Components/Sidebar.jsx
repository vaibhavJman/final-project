// Sidebar.jsx
import { useNavigate } from 'react-router-dom'; 
import {
    ChevronRight,
    Layout,
    Users,
    BarChart as BarChartIcon,
    FileText,
} from "lucide-react";

import { MdDashboard } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { GrDocumentPerformance } from "react-icons/gr";
import { PiExamFill } from "react-icons/pi";

const Sidebar = ({ activeNav, setActiveNav }) => {
  const navigate = useNavigate(); 

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <h1 className="text-xl font-semibold">PerformancePro</h1>
      </div>
      <nav className="flex-grow">
        {[
          { name: "Dashboard", icon: MdDashboard, path: "/welcome" },
          { name: "Trainers", icon: BsPeopleFill, path: "/trainers" },
          { name: "Trainings", icon: PiExamFill , path: "/training" }, 
         
        ].map((item) => (
          <button
            key={item.name}
            className={`flex items-center w-full px-4 py-2 text-left text-sm ${
              activeNav === item.name.toLowerCase()
                ? "bg-purple-200"
                : "hover:bg-purple-100"
            }`}
            onClick={() => {
              setActiveNav(item.name.toLowerCase());
              navigate(item.path); 
            }}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
            <ChevronRight className="ml-auto" />
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
