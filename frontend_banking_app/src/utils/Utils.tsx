import {useLocation} from "react-router-dom";

export const formatBalance = (raw: number | undefined): string => {
  if(raw === undefined) return "0,00";

  return raw.toLocaleString("de", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("de");
}

export const formatTime = (date: Date): string => {
  return new Date(date).toLocaleTimeString("de");
}

export const getTimeSince = (date: Date): string => {
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

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

const useUtils = () => {
  const location = useLocation();

  const checkRouteActive = (path: string): boolean => {
    return path === location.pathname;
  }

  return { checkRouteActive }
};

export default useUtils;