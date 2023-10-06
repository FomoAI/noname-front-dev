import { useState, useEffect } from "react";

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const interval = MINUTE

const parceDate = (date,time) => {
  return new Date(date.split('.')[2],Number(date.split('.')[1]) - 1,
  date.split('.')[0],time.split(':')[0],time.split(':')[1])
}

export default function useDates(deadline,time,state = true) {
  const [timespan, setTimespan] = useState(new Date(new Date().toISOString()) - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimespan((_timespan) => _timespan - interval);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  useEffect(() => {
    setTimespan(new Date(parceDate(deadline,time)) - Date.now());
  }, [deadline]);

  return {
    days: Math.floor(timespan / DAY),
    hours: Math.floor((timespan / HOUR) % 24),
    minutes: Math.floor((timespan / MINUTE) % 60),
    seconds: Math.floor((timespan / SECOND) % 60)
  };
}