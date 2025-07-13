import React from "react";

export default function PageHeader({
  title,
  subtitle,
  rightActions,
  className = "",
}: {
  title: string;
  subtitle?: string;
  rightActions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      {rightActions && <div>{rightActions}</div>}
    </div>
  );
}
