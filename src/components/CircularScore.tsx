interface CircularScoreProps {
  score: number; // 0-100
  label: string;
}

export default function CircularScore({ score, label }: CircularScoreProps) {
  // Calculate opacity based on score (lower score = lower opacity)
  const getOpacity = (value: number): number => {
    if (value >= 90) return 1.0;
    if (value >= 70) return 0.8;
    if (value >= 50) return 0.6;
    return 0.4;
  };

  const opacity = getOpacity(score);

  // Use viewBox for responsive SVG - will scale to container size
  const viewBoxSize = 100;
  const strokeWidth = 8;
  const radius = (viewBoxSize - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const center = viewBoxSize / 2;

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-3">
      <div className="circular-score-container relative">
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className="transform -rotate-90 w-full h-full"
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--surface)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={opacity}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.1))',
            }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="circular-score-text font-bold text-[var(--accent)]"
            style={{ opacity }}
          >
            {score}
          </span>
        </div>
      </div>
      {/* Label */}
      <span className="text-sm text-[var(--text-secondary)] text-center font-medium">
        {label}
      </span>
    </div>
  );
}
