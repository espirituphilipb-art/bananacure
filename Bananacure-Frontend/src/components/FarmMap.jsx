import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Tooltip
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function FarmMap() {
  const dronePosition = [8.4842, 124.6212];

  const diseaseAreas = [
    {
      id: 1,
      name: "TR4 Detected",
      position: [8.4848, 124.6220],
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

  return (
    <div className="map-card">

      <div className="map-header">

        <div>
          <h3>Farm Monitoring Map</h3>
          <p>
            Live GPS Monitoring and Disease Detection
          </p>
        </div>

        <span className="map-status">
          ● LIVE
        </span>

      </div>

      <MapContainer
        center={dronePosition}
        zoom={17}
        scrollWheelZoom={true}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "16px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Drone */}

        <Marker position={dronePosition}>
          <Popup>
            <strong>BananaBot Bravo</strong>
            <br />
            Status : Active
            <br />
            Battery : 68%
            <br />
            Tank : 55%
          </Popup>

          <Tooltip permanent direction="top">
            🚁 Drone
          </Tooltip>
        </Marker>

        {/* Disease Zones */}

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
              Requires Spraying
            </Popup>
          </Circle>
        ))}
      </MapContainer>

      <div className="map-legend">

        <div className="legend-item">
          <span
            className="legend-color"
            style={{ background: "#2e7d32" }}
          ></span>

          Healthy Area
        </div>

        <div className="legend-item">
          <span
            className="legend-color"
            style={{ background: "#f4b400" }}
          ></span>

          Black Sigatoka
        </div>

        <div className="legend-item">
          <span
            className="legend-color"
            style={{ background: "#e53935" }}
          ></span>

          TR4 Infection
        </div>

        <div className="legend-item">
          🚁 Active Drone
        </div>

      </div>

    </div>
  );
}

export default FarmMap;