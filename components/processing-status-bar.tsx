import React from "react";

interface ProcessingStatusBarProps {
  pollingAttempt: number;
  maxPollingAttempts: number;
}

export default function ProcessingStatusBar({
  pollingAttempt,
  maxPollingAttempts,
}: ProcessingStatusBarProps) {
  const percent = Math.min(100, (pollingAttempt / maxPollingAttempts) * 100);
  const minutesLeft = Math.max(
    0,
    Number(((maxPollingAttempts - pollingAttempt) * 0.5).toFixed(1))
  );

  return (
    <div className="w-[500px] flex items-center ">
      <span className="text-[11px] font-semibold font-mono uppercase tracking-wide subpixel-antialiased text-stone-600 min-w-[48px]">
        Status
      </span>
      <div className="flex-1">
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className="bg-gray-800 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
      <span className="text-[10px] font-semibold font-mono uppercase tracking-wide subpixel-antialiased text-stone-600 min-w-[90px] text-right">
        {minutesLeft} min left
      </span>
    </div>
  );
}
