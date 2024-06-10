import {useEffect, useState} from "react";

const useTimer = (actionAfter: () => void) => {
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [active, setActive] = useState(false);

  useEffect(() => {
    if(!active) return;

    if(timeLeft === 0) {
      actionAfter();
      setActive(false);
    }

    const timeout = setTimeout(() => setTimeLeft((prevState) => prevState -1), 1000)

    return () => clearTimeout(timeout)
  }, [ timeLeft, active ]);

  const start = (duration: number) => {
    setActive(true);
    setTimeLeft(duration);
  }

  const reset = () => {
    setActive(false);
    setTimeLeft(0);
  }

  return { timeLeft, start, reset };
};

export default useTimer;