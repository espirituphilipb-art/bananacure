function StatCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="card stat-card">

      <div className="card-top">

        <div>

          <span className="card-title">
            {title}
          </span>

          <h2 className="card-value">
            {value}
          </h2>

          <p className="card-subtitle">
            {subtitle}
          </p>

        </div>

        <div className="card-icon">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;