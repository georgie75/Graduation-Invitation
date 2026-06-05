import { useState, useEffect } from "react";

const TARGET = new Date("June 13, 2026 19:00:00").getTime();

function calc() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00", expired: true };
  const pad = (n: number) => n.toString().padStart(2, "0");
  return {
    days: pad(Math.floor(diff / (1000 * 60 * 60 * 24))),
    hours: pad(Math.floor((diff / (1000 * 60 * 60)) % 24)),
    minutes: pad(Math.floor((diff / (1000 * 60)) % 60)),
    seconds: pad(Math.floor((diff / 1000) % 60)),
    expired: false,
  };
}

export function useCountdown() {
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}
