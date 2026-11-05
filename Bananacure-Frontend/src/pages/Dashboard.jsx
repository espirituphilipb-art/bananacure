import { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import FarmMap from "../components/FarmMap";
import ProgressCard from "../components/ProgressCard";
import DroneStatus from "../components/DroneStatus";

import {
  FaMapMarkerAlt,
  FaBatteryThreeQuarters,
  FaSprayCan,
  FaFlask,
  FaWind,
  FaThermometerHalf,
  FaCheckCircle,
} from "react-icons/fa";

import "./Dashboard.css";

const DRONE_DATA = {
  bravo: {
    name: "BananaBot Bravo",
    status: "Active Mission",
    location: "Carmen, CDO",
    coords: [8.4842, 124.6212],
    battery: 68,
    batterySubtitle: "Normal Operation",
    spraysToday: 24,
    tankCapacity: 55,
    altitude: "25 m",
    speed: "12 km/h",
    gpsLock: "True (14 Satellites)",
    flightMode: "Auto-Waypoint",
  },
  alpha: {
    name: "BananaBot Alpha",
    status: "Standby Mode",
    location: "Iponan, CDO",
    coords: [8.491, 124.605],
    battery: 92,
    batterySubtitle: "Fully Charged",
    spraysToday: 18,
    tankCapacity: 80,
    altitude: "0 m",
    speed: "0 km/h",
    gpsLock: "True (16 Satellites)",
    flightMode: "RTH / Ready",
  },
  charlie: {
    name: "BananaBot Charlie",
    status: "Maintenance Alert",
    location: "Canitoan, CDO",
    coords: [8.4715, 124.612],
    battery: 34,
    batterySubtitle: "Low Battery",
    spraysToday: 9,
    tankCapacity: 20,
    altitude: "15 m",
    speed: "8 km/h",
    gpsLock: "True (10 Satellites)",
    flightMode: "Manual Return",
  },
};

function Dashboard() {
  const [selectedDroneKey, setSelectedDroneKey] = useState("bravo");
  const currentDrone = DRONE_DATA[selectedDroneKey];

  return (
    <div className="dashboard-outer-frame">
      <div className="dashboard-card-wrapper">
        
        {/* Page Title & Device Dropdown */}
        <div className="page-header">
          <div className="page-title-group">
            <h2>Precision Monitoring Center</h2>
            <p>Real-Time Coordinate Integration for Precision Pesticide Application</p>
          </div>

          <div className="header-actions">
            <label htmlFor="device-select" className="select-label">Active Drone:</label>
            <select
              id="device-select"
              className="device-select"
              value={selectedDroneKey}
              onChange={(e) => setSelectedDroneKey(e.target.value)}
            >
              <option value="bravo">BananaBot Bravo (Active)</option>
              <option value="alpha">BananaBot Alpha (Standby)</option>
              <option value="charlie">BananaBot Charlie (Maintenance)</option>
            </select>
          </div>
        </div>

        {/* Weather Status Bar */}
        <div className="field-status-bar">
          <div className="status-chip success">
            <FaCheckCircle className="chip-icon success" />
            <span>Spray Status: <strong>Optimal Conditions</strong></span>
          </div>
          <div className="status-chip info">
            <FaWind className="chip-icon" />
            <span>Wind: <strong>8 km/h NE</strong></span>
          </div>
          <div className="status-chip info">
            <FaThermometerHalf className="chip-icon" />
            <span>Temp: <strong>28°C</strong> | 78% Humidity</span>
          </div>
        </div>

        {/* 4-Column KPI Cards Row */}
        <section className="kpi-row">
          <StatCard
            title="Current Location"
            value={currentDrone.location}
            subtitle={`Status: ${currentDrone.status}`}
            icon={<FaMapMarkerAlt />}
          />
          <StatCard
            title="Battery Level"
            value={`${currentDrone.battery}%`}
            subtitle={currentDrone.batterySubtitle}
            icon={<FaBatteryThreeQuarters />}
          />
          <StatCard
            title="Today's Sprays"
            value={currentDrone.spraysToday}
            subtitle="Completed Missions"
            icon={<FaSprayCan />}
          />
          <StatCard
            title="Tank Capacity"
            value={`${currentDrone.tankCapacity}%`}
            subtitle="Chemical Remaining"
            icon={<FaFlask />}
          />
        </section>

        {/* Refactored Compact Workspace Section */}
        <section className="workspace-row">
          <div className="map-card-panel">
            <FarmMap activeDrone={currentDrone} />
          </div>

          <div className="telemetry-panel-stack">
            <ProgressCard title="Battery Usage" value={currentDrone.battery} />
            <ProgressCard title="Tank Capacity" value={currentDrone.tankCapacity} />
            <DroneStatus drone={currentDrone} />
          </div>
        </section>

      </div>

      {/* Floating Bottom Navigation */}
      <Sidebar />
    </div>
  );
}

export default Dashboard;