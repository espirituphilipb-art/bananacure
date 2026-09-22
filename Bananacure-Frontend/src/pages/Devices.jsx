import Sidebar from "../components/Sidebar";

function Devices() {
  return (
    <div className="dashboard">

      <Sidebar />

      <main className="content">

        <div className="page-header">
          <h1>Device Management</h1>
          <p>Manage all connected drone devices.</p>
        </div>

        <div className="device-grid">

          <div className="card">
            <h3>Drone Alpha</h3>
            <p>Status: Online</p>
            <p>Battery: 82%</p>
          </div>

          <div className="card">
            <h3>Drone Bravo</h3>
            <p>Status: Online</p>
            <p>Battery: 68%</p>
          </div>

          <div className="card">
            <h3>Drone Charlie</h3>
            <p>Status: Offline</p>
            <p>Battery: 0%</p>
          </div>

        </div>

        {/* Add Device Form */}

        <div className="card add-device-card">

          <h2>Add New Device</h2>

          <input
            type="text"
            placeholder="Device Name"
          />

          <input
            type="text"
            placeholder="Drone ID"
          />

          <input
            type="text"
            placeholder="Location"
          />

          <input
            type="text"
            placeholder="Operator Name"
          />

          <button className="submit-btn">
            Register Device
          </button>

        </div>

      </main>

    </div>
  );
}

export default Devices;