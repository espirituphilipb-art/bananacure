function DroneStatus({ drone }) {
  const isStandby = drone?.status?.includes("Standby");
  const isAlert = drone?.status?.includes("Alert");

  return (
    <div className="drone-status-card">
      <div className="status-header">
        <h4>Drone Telemetry</h4>
        <div
          className={`connection-badge ${
            isAlert ? "alert" : isStandby ? "standby" : "connected"
          }`}
        >
          <span className="pulse-dot"></span> {drone?.status || "Connected"}
        </div>
      </div>

      <div className="telemetry-grid">
        <div className="telemetry-item">
          <span className="item-label">Altitude</span>
          <span className="item-value">{drone?.altitude || "25 m"}</span>
        </div>
        <div className="telemetry-item">
          <span className="item-label">Air Speed</span>
          <span className="item-value">{drone?.speed || "12 km/h"}</span>
        </div>
        <div className="telemetry-item">
          <span className="item-label">GPS Lock</span>
          <span className="item-value success">{drone?.gpsLock || "True"}</span>
        </div>
        <div className="telemetry-item">
          <span className="item-label">Flight Mode</span>
          <span className="item-value">{drone?.flightMode || "Auto-Waypoint"}</span>
        </div>
      </div>
    </div>
  );
}

export default DroneStatus;