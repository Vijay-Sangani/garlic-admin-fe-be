import { JSX } from "react";

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
}: {
  icon: JSX.Element;
  subtitle: string;
  title: string;
  value: string;
  trend?: { positive: boolean; value: string };
}): JSX.Element => (
  <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-primary/10 rounded-xl text-primary">{icon}</div>
      {trend && (
        <span
          className={`text-sm font-medium ${trend.positive ? "text-success" : "text-destructive"}`}
        >
          {trend.value}
        </span>
      )}
    </div>
    <div>
      <h3 className="text-3xl font-bold text-foreground mb-1">{value}</h3>
      <p className="text-sm text-muted-foreground">{title}</p>
      {subtitle && <p className="text-xs text-muted-foreground/60 mt-1">{subtitle}</p>}
    </div>
  </div>
);

export default StatCard;
