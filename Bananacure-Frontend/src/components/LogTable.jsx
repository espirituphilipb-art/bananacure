import { logs } from "../data/dummyData";

function LogTable() {
  return (
    <div className="table-container">

      <h3>
        Target Coordinate Log Records
      </h3>

      <table>

        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Pathology</th>
            <th>Coordinates</th>
            <th>Dose</th>
            <th>Mission</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.time}</td>
              <td>{log.disease}</td>
              <td>{log.coordinate}</td>
              <td>{log.dose}</td>
              <td>{log.result}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default LogTable;