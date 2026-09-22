import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import LogTable from "../components/LogTable";
import FarmMap from "../components/FarmMap";
import ProgressCard from "../components/ProgressCard";
import DroneStatus from "../components/DroneStatus";
import DiseaseTable from "../components/DiseaseTable";

import {
  FaMapMarkerAlt,
  FaBatteryThreeQuarters,
  FaSprayCan,
  FaFlask
} from "react-icons/fa";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <main className="content">

        {/* HEADER */}

        <div className="header">

          <div>
            <h2>Precision Monitoring Center</h2>

            <p>
              Real-Time Coordinate Integration for
              Precision Pesticide Application
            </p>
          </div>

          <div className="header-actions">

            <select>
              <option>BananaBot Bravo</option>
              <option>BananaBot Alpha</option>
              <option>BananaBot Charlie</option>
            </select>

          </div>

        </div>

        {/* KPI CARDS */}

        <div className="cards">

          <StatCard
            title="Current Location"
            value="Carmen, CDO"
            subtitle="Drone Active"
            icon={<FaMapMarkerAlt />}
          />

          <StatCard
            title="Battery Level"
            value="68%"
            subtitle="Normal"
            icon={<FaBatteryThreeQuarters />}
          />

          <StatCard
            title="Today's Sprays"
            value="24"
            subtitle="Completed Missions"
            icon={<FaSprayCan />}
          />

          <StatCard
            title="Tank Capacity"
            value="55%"
            subtitle="Chemical Remaining"
            icon={<FaFlask />}
          />

        </div>

        {/* CENTER SECTION */}

        <div className="main-layout">

          <div className="left-panel">

            <FarmMap />

          </div>

          <div className="right-panel">

            <ProgressCard
              title="Battery Usage"
              value={68}
            />

            <ProgressCard
              title="Tank Capacity"
              value={55}
            />

            <DroneStatus />

          </div>

        </div>

        {/* BOTTOM SECTION */}

        <div className="logs-layout">

          <DiseaseTable />

          <LogTable />

        </div>

      </main>

    </div>
  );
}

export default Dashboard;