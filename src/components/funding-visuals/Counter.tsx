import { useState, useEffect } from "react";

export default function Counter({ target, prefix }: { target: number; prefix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target]);
  return <>{prefix !== undefined ? prefix : ""}{val.toLocaleString()}</>;
}
