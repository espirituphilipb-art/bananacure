import { NavLink, useNavigate } from "react-router-dom";
import {
  FaChartLine,
  FaBroadcastTower,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = storedUser.username || "Field Supervisor";

  return (
    <div className="dock-container">
      <nav className="bottom-dock">
        {/* Navigation Items */}
        <div className="dock-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "dock-btn active" : "dock-btn"
            }
          >
            <FaChartLine className="dock-icon" />
            <span className="dock-label">Dashboard</span>
          </NavLink>

          <NavLink
            to="/devices"
            className={({ isActive }) =>
              isActive ? "dock-btn active" : "dock-btn"
            }
          >
            <FaBroadcastTower className="dock-icon" />
            <span className="dock-label">Devices</span>
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? "dock-btn active" : "dock-btn"
            }
          >
            <FaUsers className="dock-icon" />
            <span className="dock-label">Users</span>
          </NavLink>
        </div>

        {/* Divider */}
        <div className="dock-divider"></div>

        {/* Profile Info */}
        <div className="dock-user">
          <div className="dock-avatar">BC</div>
          <div className="dock-user-info">
            <h4>{userName}</h4>
            <p>Drone Monitoring Center</p>
          </div>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="dock-logout-btn" type="button">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;