import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Tooltip,
} from "react-leaflet";
import { FaExpand, FaTimes } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

function FarmMap({ activeDrone }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dronePosition = activeDrone?.coords || [8.4842, 124.6212];
  const droneName = activeDrone?.name || "BananaBot Bravo";
  const battery = activeDrone?.battery || 68;
  const tank = activeDrone?.tankCapacity || 55;

  const diseaseAreas = [
    {
      id: 1,
      name: "TR4 Infection",
      position: [8.4848, 124.622],
      color: "#e53935",
      radius: 25,
    },
    {
      id: 2,
      name: "Black Sigatoka",
      position: [8.4835, 124.6203],
      color: "#f4b400",
      radius: 20,
    },
  ];

  // Reusable Map Component
  const RenderMapContent = () => (
    <MapContainer
      center={dronePosition}
      zoom={16}
      zoomControl={false}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", borderRadius: "14px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={dronePosition}>
        <Popup>
          <div className="map-popup-content">
            <strong>{droneName}</strong>
            <br />
            Location: {activeDrone?.location || "Carmen, CDO"}
            <br />
            Battery: {battery}% | Tank: {tank}%
          </div>
        </Popup>
        <Tooltip permanent direction="top" className="drone-tooltip">
          🚁 {droneName}
        </Tooltip>
      </Marker>

      {diseaseAreas.map((area) => (
        <Circle
          key={area.id}
          center={area.position}
          radius={area.radius}
          pathOptions={{
            color: area.color,
            fillColor: area.color,
            fillOpacity: 0.35,
          }}
        >
          <Popup>
            <strong>{area.name}</strong>
            <br />
            Target Spray Zone
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );

  return (
    <>
      {/* Small Dashboard Map Card */}
      <div className="compact-map-wrapper" onClick={() => setIsModalOpen(true)}>
        <div className="map-overlay-header">
          <div>
            <h3>Farm Monitoring Map</h3>
            <p>Click map to expand full view</p>
          </div>
          <button className="expand-btn" aria-label="Expand Map">
            <FaExpand />
          </button>
        </div>

        <RenderMapContent />

        <div className="map-legend-bar">
          <div className="legend-item">
            <span className="legend-color healthy"></span>
            <span>Healthy</span>
          </div>
          <div className="legend-item">
            <span className="legend-color sigatoka"></span>
            <span>Black Sigatoka</span>
          </div>
          <div className="legend-item">
            <span className="legend-color tr4"></span>
            <span>TR4</span>
          </div>
        </div>
      </div>

      {/* FULL MAP MODAL OVERLAY */}
      {isModalOpen && (
        <div className="map-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div
            className="map-modal-content"
            onClick={(e) => e.stopPropagation()} // Prevents inner click from closing
          >
            <div className="modal-header">
              <div>
                <h2>{droneName} — Full Field View</h2>
                <p>Live GPS Monitoring & Targeted Spray Zones</p>
              </div>
              <button
                className="close-modal-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="modal-map-body">
              <RenderMapContent />
            </div>

            <div className="modal-footer-legend">
              <div className="legend-item">
                <span className="legend-color healthy"></span> Healthy Area
              </div>
              <div className="legend-item">
                <span className="legend-color sigatoka"></span> Black Sigatoka
              </div>
              <div className="legend-item">
                <span className="legend-color tr4"></span> TR4 Infection Zone
              </div>
              <div className="legend-item">
                🚁 {droneName} ({battery}% Battery)
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FarmMap;