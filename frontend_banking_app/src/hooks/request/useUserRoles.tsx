import {API_URLS_V1} from "../../const/GlobalConst";
import {UpdateUserRolesRequest} from "../../types/Request-Response";
import {Roles} from "../../types/Enums";
import React, {ReactElement} from "react";
import {CheckBadgeIcon, StarIcon, UsersIcon} from "@heroicons/react/24/solid";
import {RoleObject} from "../../types/Types";
import useAuthContext from "../contextHook/useAuthContext";

const useUserRoles = () => {
  const { refreshAuth } = useAuthContext();

  const getRoleIcon = (role: Roles): ReactElement => {
    switch (role) {
      case Roles.ADMIN: return <CheckBadgeIcon className={"text-red-600 icon"} key={role.toLowerCase()}/>
      case Roles.VIP: return <StarIcon className={"text-yellow-500 icon"} key={role.toLowerCase()} />
      case Roles.USER: return <UsersIcon className={"text-indigo-600 icon"} key={role.toLowerCase()}/>
    }
  }

  const getRoleLabel = (role: Roles): string => {
    return role.split("_")[1]
  }

  const getRoleObject = (role: Roles): RoleObject =>  {
    return {
      enum: role,
      icon: getRoleIcon(role),
      label: getRoleLabel(role)
    }
  }

  const getRoleObjects = (roles: Roles[]) => {
    let roleObjects: RoleObject[] = [];
    roles.map((role) => roleObjects.push(getRoleObject(role)));
    return roleObjects;
  }

  const handleUpdateUserRoles = async (request: UpdateUserRolesRequest, actionAfter?:  () => any): Promise<void> => {

    try {
      const response = await fetch(API_URLS_V1.users + "/updateRoles", {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request),
      });

      if(response.status === 401) {
        refreshAuth();
        throw new Error("Unauthorized")
      }

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data = await response.text();
      actionAfter && actionAfter();
    } catch (error) {
      console.log(error);
    }
  }

  return { handleUpdateUserRoles, getRoleObjects }
};

export default useUserRoles;