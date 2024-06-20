import React from 'react';
import useUtils, {classNames} from "../utils/Utils";
import {NavigationConfig} from "../types/ConstTypes";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAuthContext from "../hooks/contextHook/useAuthContext";

interface NavigationLinkItemsProps {
  item: NavigationConfig
}

const NavigationLinkItem = ({ item }: NavigationLinkItemsProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { checkRouteActive } = useUtils();
  const { userHasRoles } = useAuth();

  // Wenn der Link Authentifizierung benötigt und der Nutzer nicht authentifiziert ist gebe Nichts zurück
  if(item.requireAuthentication && !isAuthenticated) return <></>;

  // Wenn der Link Rollen benötigt und der Nutzer nicht über diese Verfügt gebe Nichts zurück
  if(!userHasRoles(item.requiredRoles)) return <></>;

  //Sonst gebe den Reiter zurück
  return (
    <Link
      key={item.name}
      onClick={() => navigate(item.to)}
      to={item.to}
      className={classNames(
        checkRouteActive(item.to)
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        'rounded-md px-3 py-2 text-sm font-medium'
      )}
      aria-current={checkRouteActive(item.to) ? 'page' : undefined}
    >
      {item.name}
    </Link>
  );
};

export default NavigationLinkItem;