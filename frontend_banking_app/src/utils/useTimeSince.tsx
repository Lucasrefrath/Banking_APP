import React from 'react';
import useFormat from "./useFormat";

const useTimeSince = () => {
  const { formatDate } = useFormat();

  const getTimeSince = (date: Date): string => {
    const seconds: number = (Date.now() - new Date(date).getTime()) / 1000;
    if(seconds < 20) return 'few seconds ago'
    if(seconds < 60) return `${seconds.toFixed(0)} seconds ago`

    const minutes: number = seconds / 60;
    if(minutes < 2) return `${minutes.toFixed(0)} minute ago`
    if(minutes < 60) return `${minutes.toFixed(0)} minutes ago`

    const hours: number = minutes / 60;
    if(hours < 2) return `${hours.toFixed(0)} hour ago`
    if(hours < 24) return `${hours.toFixed(0)} hours ago`

    const days: number = hours /24;
    if(days < 2) return `${days.toFixed(0)} day ago`
    if(days < 7) return `${days.toFixed(0)} days ago`

    const weeks: number = days / 7;
    if(weeks < 2) return `${weeks.toFixed(0)} week ago`
    if(weeks < 52) return `${weeks.toFixed(0)} weeks ago`

    const years: number = weeks / 52;
    if(years < 2) return `${years.toFixed(0)} year ago`
    if(years < 10) return `${years.toFixed(0)} years ago`

    return "long ago"
  }

  const getDay = (date: Date) => {
    const today: Date = new Date(Date.now())
    date = new Date(date)

    if(date.toDateString() === today.toDateString()) return "today"

    const diff: string = ((date.getTime() - today.getTime()) / (1000 * 3600 * 24)).toString().split(".")[0];
    if(diff === "1") return `yesterday`
    if(Number.parseInt(diff) >= 14) return `on ${formatDate(date)}`
    return `${diff} days ago`
  }

  const getMinutesSince = (date: Date): number => {
    date = new Date(date);
    const now: Date = new Date(Date.now());

    return (now.getTime() - date.getTime()) / 1000 / 60
  }

  return { getTimeSince, getDay, getMinutesSince };
};

export default useTimeSince;