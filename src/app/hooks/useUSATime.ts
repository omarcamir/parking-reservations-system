import { useEffect, useState } from 'react';

function useUSATime(timeZone = 'America/New_York') {
  const [time, setTime] = useState(() => new Date().toLocaleString('en-US', { timeZone }));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleString('en-US', { timeZone });
      setTime(now);
    }, 1000); // update every second

    return () => clearInterval(interval);
  }, [timeZone]);

  return time;
}
export default useUSATime;