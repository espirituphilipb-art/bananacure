import { useState } from "react";
import {
  FaBroadcastTower,
  FaBatteryThreeQuarters,
  FaPlusCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaWifi,
} from "react-icons/fa";
import "./Devices.css";

function Devices() {
  const [devices, setDevices] = useState([
    {
      id: "DRN-001",
      name: "BananaBot Alpha",
      status: "Online",
      battery: 82,
      location: "Iponan, CDO",
      operator: "Juan Dela Cruz",
    },
    {
      id: "DRN-002",
      name: "BananaBot Bravo",
      status: "Online",
      battery: 68,
      location: "Carmen, CDO",
      operator: "Philip Espiritu",
    },
    {
      id: "DRN-003",
      name: "BananaBot Charlie",
      status: "Offline",
      battery: 0,
      location: "Canitoan, CDO",
      operator: "Maria Santos",
    },
  ]);

  const [name, setName] = useState("");
  const [droneId, setDroneId] = useState("");
  const [location, setLocation] = useState("");
  const [operator, setOperator] = useState("");

  const handleRegisterDevice = (e) => {
    e.preventDefault();
    if (!name || !droneId) return;

    const newDevice = {
      id: droneId,
      name: name,
      status: "Online",
      battery: 100,
      location: location || "Unassigned",
      operator: operator || "System Admin",
    };

    setDevices([newDevice, ...devices]);
    setName("");
    setDroneId("");
    setLocation("");
    setOperator("");
  };

  return (
    <div className="devices-outer-frame">
      <div className="devices-card-wrapper">
        
        {/* Page Title Header */}
        <div className="page-header">
          <div className="page-title-group">
            <h2>Device Fleet Management</h2>
            <p>Monitor, configure, and register all connected drone hardware.</p>
          </div>
          <div className="fleet-badge">
            <FaBroadcastTower />
            <span>Total Fleet: <strong>{devices.length} Units</strong></span>
          </div>
        </div>

        {/* Device Fleet Cards Grid */}
        <section className="device-grid">
          {devices.map((device) => (
            <div key={device.id} className="device-card">
              <div className="device-card-header">
                <div className="device-info">
                  <h3>{device.name}</h3>
                  <span className="drone-id-tag">{device.id}</span>
                </div>
                <span
                  className={`status-pill ${
                    device.status === "Online" ? "online" : "offline"
                  }`}
                >
                  {device.status === "Online" ? (
                    <FaCheckCircle />
                  ) : (
                    <FaTimesCircle />
                  )}
                  {device.status}
                </span>
              </div>

              <div className="device-card-body">
                <div className="device-metric">
                  <span className="metric-label">Battery Status</span>
                  <div className="battery-indicator">
                    <div className="progress-bar-bg">
                      <div
                        className={`progress-bar-fill ${
                          device.battery < 20 ? "low" : ""
                        }`}
                        style={{ width: `${device.battery}%` }}
                      ></div>
                    </div>
                    <span className="battery-text">
                      <FaBatteryThreeQuarters /> {device.battery}%
                    </span>
                  </div>
                </div>

                <div className="device-meta-row">
                  <span>Location:</span>
                  <strong>{device.location}</strong>
                </div>
                <div className="device-meta-row">
                  <span>Operator:</span>
                  <strong>{device.operator}</strong>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Registration Form Card */}
        <section className="add-device-card">
          <div className="card-form-header">
            <FaPlusCircle className="form-icon" />
            <div>
              <h3>Register New Drone Unit</h3>
              <p>Add a new hardware identifier to the telemetry network.</p>
            </div>
          </div>

          <form onSubmit={handleRegisterDevice} className="device-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="dev-name">Device Name</label>
                <input
                  id="dev-name"
                  type="text"
                  placeholder="e.g. BananaBot Delta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dev-id">Drone ID / Serial Number</label>
                <input
                  id="dev-id"
                  type="text"
                  placeholder="e.g. DRN-004"
                  value={droneId}
                  onChange={(e) => setDroneId(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dev-loc">Assigned Location</label>
                <input
                  id="dev-loc"
                  type="text"
                  placeholder="e.g. Carmen, CDO"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dev-op">Operator Name</label>
                <input
                  id="dev-op"
                  type="text"
                  placeholder="e.g. Field Supervisor"
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              <FaPlusCircle /> Register Device
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}

export default Devices;