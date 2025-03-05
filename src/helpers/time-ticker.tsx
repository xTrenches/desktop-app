import React, { useEffect, useState } from "react";

interface TimeTickerProps {
  interval?: number;
  children: ((tickIndex: number) => React.ReactNode) | React.ReactNode;
}

function TimeTicker({ interval = 1000, children }: TimeTickerProps) {
  const [tickIndex, setTickIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickIndex((prevTick) => prevTick + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  if (typeof children === "function") {
    return <>{children(tickIndex)}</>;
  }

  return <>{children}</>;
}

export default TimeTicker;
