function ProgressCard({
    title,
    value
  }) {
  
    return (
  
      <div className="card">
  
        <h3>{title}</h3>
  
        <div className="progress">
  
          <div
            className="progress-fill"
            style={{
              width:`${value}%`
            }}
          ></div>
  
        </div>
  
        <h2>{value}%</h2>
  
      </div>
  
    )
  }
  
  export default ProgressCard