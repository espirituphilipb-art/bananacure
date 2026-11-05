function DiseaseTable() {
  const records = [
    {
      disease: "Fusarium Wilt (TR4)",
      confidence: "97%",
      spray: "5.5 ml/m²",
      status: "High Alert",
    },
    {
      disease: "Black Sigatoka",
      confidence: "95%",
      spray: "4.2 ml/m²",
      status: "Treated",
    },
  ];

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Disease Detection Logs</h3>
        <span className="record-count">{records.length} Detections Today</span>
      </div>

      <div className="table-scroll-wrapper">
        <table>
          <thead>
            <tr>
              <th>Disease Name</th>
              <th>AI Confidence</th>
              <th>Dosage</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, index) => (
              <tr key={index}>
                <td className="disease-name-cell">{r.disease}</td>
                <td>
                  <span className="confidence-pill">{r.confidence}</span>
                </td>
                <td className="dose-cell">{r.spray}</td>
                <td>
                  <span
                    className={`status-pill ${
                      r.status === "High Alert" ? "alert" : "treated"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DiseaseTable;