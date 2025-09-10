export default function StatCard({ 
  label, 
  value, 
  icon, 
  iconColor = 'text-cyan-400',
  change,
  changeType = 'neutral',
  className = '' 
}) {
  const changeColors = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-gray-400'
  };

  return (
    <div className={`p-6 rounded-lg bg-white/5 border border-white/10 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span style={{ color: 'var(--text-muted)' }}>{label}</span>
        {icon && <i className={`${icon} ${iconColor}`}></i>}
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      {change && (
        <p className={`text-sm ${changeColors[changeType]}`}>
          {change}
        </p>
      )}
    </div>
  );
}