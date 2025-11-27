import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function CountUpOnView({ end, duration = 2 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = end / (duration * 60); // 60fps  
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(counter);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16); // ~60fps refresh

    return () => clearInterval(counter);
  }, [inView]);

  return <span ref={ref}>{count}</span>;
}

export default CountUpOnView;
