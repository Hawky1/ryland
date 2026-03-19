import { useState, useEffect, forwardRef } from "react";

const Counter = forwardRef<HTMLSpanElement, { target: number; prefix?: string }>(
  ({ target, prefix }, ref) => {
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
    return <span ref={ref}>{prefix !== undefined ? prefix : ""}{val.toLocaleString()}</span>;
  }
);

Counter.displayName = "Counter";

export default Counter;
