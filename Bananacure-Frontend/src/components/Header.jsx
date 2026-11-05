import { FaLeaf } from "react-icons/fa";
import "./Header.css";

function Header() {
  return (
    <header className="fixed-top-header">
      <div className="brand-title">
        <div className="brand-logo">
          <FaLeaf />
        </div>
        <div>
          <h3>Bananacure</h3>
          <p>Precision Drone Spraying System</p>
        </div>
      </div>

      <div className="system-status">
        <span className="status-dot"></span>
        <span>Monitoring System</span>
      </div>
    </header>
  );
}

export default Header;