function DiseaseTable() {

    const records = [
  
      {
        disease:"Fusarium Wilt",
        confidence:"97%",
        spray:"5.5ml"
      },
  
      {
        disease:"Black Sigatoka",
        confidence:"95%",
        spray:"4.2ml"
      }
  
    ]
  
    return (
  
      <div className="table-container">
  
        <h3>
          Disease Detection Logs
        </h3>
  
        <table>
  
          <thead>
  
            <tr>
  
              <th>Disease</th>
  
              <th>Confidence</th>
  
              <th>Dose</th>
  
            </tr>
  
          </thead>
  
          <tbody>
  
            {
              records.map((r,index)=>(
                <tr key={index}>
  
                  <td>{r.disease}</td>
  
                  <td>{r.confidence}</td>
  
                  <td>{r.spray}</td>
  
                </tr>
              ))
            }
  
          </tbody>
  
        </table>
  
      </div>
  
    )
  }
  
  export default DiseaseTable