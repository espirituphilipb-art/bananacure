import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Users from "./pages/Users";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const location = useLocation();
  // Hide fixed top header & floating bottom sidebar dock on the login page
  const isLoginPage = location.pathname === "/login" || location.pathname === "/";

  return (
    <div className="app-container">
      {!isLoginPage && <Header />}

      <main className={!isLoginPage ? "app-content-with-header" : "app-login-wrapper"}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>

      {!isLoginPage && <Sidebar />}
    </div>
  );
}

export default App;