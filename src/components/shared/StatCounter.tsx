import { useEffect, useState } from "react";

interface StatCounterProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

const StatCounter = ({ end, label, suffix = "", prefix = "" }: StatCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [end]);

  const formatted = count >= 100000
    ? `${(count / 100000).toFixed(count === end ? 2 : 1)}L`
    : count >= 1000
    ? `${(count / 1000).toFixed(count === end ? 0 : 0)}K`
    : count.toLocaleString("en-IN");

  return (
    <div className="text-center">
      <div className="stat-counter text-primary-foreground">
        {prefix}{end >= 100000 ? `${(end / 100000).toFixed(2)}L` : end >= 1000 ? `${(end / 1000).toFixed(0)}K+` : count.toLocaleString("en-IN")}{suffix}
      </div>
      <p className="mt-1 text-sm text-primary-foreground/80">{label}</p>
    </div>
  );
};

export default StatCounter;
