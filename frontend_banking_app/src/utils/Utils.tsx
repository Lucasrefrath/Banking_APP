import {useLocation} from "react-router-dom";

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