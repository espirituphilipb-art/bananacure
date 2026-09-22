import { Link, useLocation } from "react-router-dom";

import {
  FaChartLine,
  FaPlusCircle,
  FaUsers,
  FaLeaf,
  FaSignOutAlt,
  FaBroadcastTower
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">

      {/* ================= LOGO ================= */}

      <div>

        <div className="logo">

          <div className="logo-box">
            <FaLeaf />
          </div>

          <div className="logo-text">
            <h2>Bananacure</h2>
            <p>Precision Drone Spraying System</p>
          </div>

        </div>

        {/* ================= NAVIGATION ================= */}

        <nav>

          <Link to="/dashboard" className="nav-link">

            <button
              className={
                location.pathname === "/dashboard"
                  ? "nav-btn active"
                  : "nav-btn"
              }
            >
              <FaChartLine />
              <span>Dashboard</span>
            </button>

          </Link>

          <Link to="/devices" className="nav-link">

            <button
              className={
                location.pathname === "/devices"
                  ? "nav-btn active"
                  : "nav-btn"
              }
            >
              <FaBroadcastTower />
              <span>Devices</span>
            </button>

          </Link>

          <Link to="/users" className="nav-link">

            <button
              className={
                location.pathname === "/users"
                  ? "nav-btn active"
                  : "nav-btn"
              }
            >
              <FaUsers />
              <span>Users</span>
            </button>

          </Link>

        </nav>

      </div>

      {/* ================= FOOTER ================= */}

      <div>

        <div className="sidebar-footer">

          <div className="footer-avatar">
            BC
          </div>

          <div className="footer-text">

            <h4>Field Supervisor</h4>

            <p>Drone Monitoring Center</p>

          </div>

        </div>

        <button className="logout-btn">

          <FaSignOutAlt />

          <span>Logout</span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;