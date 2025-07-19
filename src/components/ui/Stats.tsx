import React, { forwardRef } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
} from "lucide-react";
import { cn } from "../../utils/cn";

export interface StatsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  value: string | number;
  change?: number;
  changeType?: "positive" | "negative" | "neutral";
  variant?: "default" | "brutalist" | "minimal" | "card";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  description?: string;
  showTrend?: boolean;
  loading?: boolean;
}

const Stats = forwardRef<HTMLDivElement, StatsProps>(
  (
    {
      title,
      value,
      change,
      changeType = "neutral",
      variant = "default",
      size = "md",
      icon,
      description,
      showTrend = true,
      loading = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    const titleSizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    const valueSizeClasses = {
      sm: "text-lg",
      md: "text-2xl",
      lg: "text-3xl",
    };

    const variantClasses = {
      default: "bg-cyber-dark border border-cyber-green/20",
      brutalist: "bg-cyber-dark border-brutal border-cyber-green shadow-brutal",
      minimal: "bg-transparent",
      card: "bg-cyber-dark/50 border border-cyber-green/10 rounded-lg",
    };

    const changeColors = {
      positive: "text-green-400",
      negative: "text-red-400",
      neutral: "text-cyber-gray",
    };

    const getTrendIcon = () => {
      if (!showTrend || change === undefined) return null;

      const iconClasses = "w-4 h-4";

      if (change > 0) {
        return changeType === "positive" ? (
          <TrendingUp className={cn(iconClasses, "text-green-400")} />
        ) : (
          <ArrowUp className={cn(iconClasses, "text-red-400")} />
        );
      } else if (change < 0) {
        return changeType === "negative" ? (
          <TrendingDown className={cn(iconClasses, "text-red-400")} />
        ) : (
          <ArrowDown className={cn(iconClasses, "text-green-400")} />
        );
      } else {
        return <Minus className={cn(iconClasses, "text-cyber-gray")} />;
      }
    };

    const baseClasses = cn(
      "relative",
      sizeClasses[size],
      variantClasses[variant],
      loading && "animate-pulse",
      className
    );

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          {title && (
            <h3
              className={cn(
                "font-brutalist font-bold uppercase tracking-wide text-cyber-green",
                titleSizeClasses[size]
              )}
            >
              {title}
            </h3>
          )}
          {icon && <div className="text-cyber-green">{icon}</div>}
        </div>

        {/* Value */}
        <div className="mb-2">
          <div className={cn("font-mono font-bold text-cyber-white", valueSizeClasses[size])}>
            {loading ? <div className="w-20 h-8 bg-cyber-green/20 rounded animate-pulse" /> : value}
          </div>
        </div>

        {/* Change & Description */}
        {(change !== undefined || description) && (
          <div className="flex items-center justify-between">
            {change !== undefined && showTrend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-mono",
                  changeColors[changeType]
                )}
              >
                {getTrendIcon()}
                <span>
                  {change > 0 ? "+" : ""}
                  {change}%
                </span>
              </div>
            )}

            {description && <div className="text-cyber-gray text-sm">{description}</div>}
          </div>
        )}

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-cyber-dark/50 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-cyber-green border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }
);

Stats.displayName = "Stats";

// Stats Grid Component
export interface StatsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

export const StatsGrid = forwardRef<HTMLDivElement, StatsGridProps>(
  ({ children, columns = 4, gap = "md", className = "", ...props }, ref) => {
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    const gapClasses = {
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-6",
    };

    return (
      <div
        ref={ref}
        className={cn("grid", columnClasses[columns], gapClasses[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StatsGrid.displayName = "StatsGrid";

// Stats Card Component
export interface StatsCardProps extends Omit<StatsProps, "variant"> {
  highlight?: boolean;
}

export const StatsCard = forwardRef<HTMLDivElement, StatsCardProps>(
  ({ highlight = false, className = "", ...props }, ref) => {
    return (
      <Stats
        ref={ref}
        variant={highlight ? "brutalist" : "card"}
        className={cn(
          "hover:shadow-lg transition-shadow",
          highlight && "ring-2 ring-cyber-green ring-offset-2 ring-offset-cyber-black",
          className
        )}
        {...props}
      />
    );
  }
);

StatsCard.displayName = "StatsCard";

// Pre-built Stats variants
export interface MetricStatsProps extends Omit<StatsProps, "icon"> {
  metric: "revenue" | "users" | "orders" | "conversion" | "performance";
}

export const MetricStats = forwardRef<HTMLDivElement, MetricStatsProps>(
  ({ metric, ...props }, ref) => {
    const getMetricIcon = () => {
      const iconClasses = "w-5 h-5";
      switch (metric) {
        case "revenue":
          return <TrendingUp className={iconClasses} />;
        case "users":
          return <BarChart3 className={iconClasses} />;
        case "orders":
          return <PieChart className={iconClasses} />;
        case "conversion":
          return <TrendingUp className={iconClasses} />;
        case "performance":
          return <BarChart3 className={iconClasses} />;
        default:
          return <BarChart3 className={iconClasses} />;
      }
    };

    return <Stats ref={ref} icon={getMetricIcon()} {...props} />;
  }
);

MetricStats.displayName = "MetricStats";

// Stats Summary Component
export interface StatsSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: {
    title: string;
    value: string | number;
    change?: number;
    changeType?: "positive" | "negative" | "neutral";
    description?: string;
  }[];
  title?: string;
  variant?: "default" | "brutalist" | "minimal";
}

export const StatsSummary = forwardRef<HTMLDivElement, StatsSummaryProps>(
  ({ stats, title, variant = "default", className = "", ...props }, ref) => {
    const variantClasses = {
      default: "bg-cyber-dark border border-cyber-green/20 p-6",
      brutalist: "bg-cyber-dark border-brutal border-cyber-green shadow-brutal p-6",
      minimal: "bg-transparent p-0",
    };

    return (
      <div ref={ref} className={cn(variantClasses[variant], className)} {...props}>
        {title && (
          <h2 className="text-xl font-brutalist font-bold uppercase tracking-wide text-cyber-green mb-6">
            {title}
          </h2>
        )}

        <StatsGrid columns={stats.length > 4 ? 4 : (stats.length as 1 | 2 | 3 | 4)}>
          {stats.map((stat, index) => (
            <Stats
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              description={stat.description}
              variant="minimal"
            />
          ))}
        </StatsGrid>
      </div>
    );
  }
);

StatsSummary.displayName = "StatsSummary";

export { Stats };
export default Stats;
