import {FullUserData} from "../types/Types";
import React, {ReactElement} from "react";
import {Roles} from "../types/Enums";
import {CheckBadgeIcon, StarIcon} from "@heroicons/react/24/solid";

const useFormatRoles = (userData: FullUserData) => {

  const formattedRoles = (): string[] => {
    let result: string[] = [];
    userData.user.roles.map((role) => result.push(role.split("_")[1]))
    return result;
  }

  const getRolePills = (): ReactElement[] => {
    let result: ReactElement[] = [];
    userData.user.roles.map((role) => result.push(
      <div className={"pill-gray"}>
        {getRoleItem(role)}
        {role.split("_")[1]}
      </div>
    ))
    return result;
  }

  const getRoleIcons = (): ReactElement[] => {
    let result: ReactElement[] = [];
    userData.user.roles.map((role) => result.push(getRoleItem(role)))
    return result;
  }

  const getRoleItem = (role: Roles): ReactElement => {
    switch (role) {
      case Roles.ADMIN: return <CheckBadgeIcon className={"text-red-600 icon"} key={role.toLowerCase()}/>
      case Roles.VIP: return <StarIcon className={"text-yellow-500 icon"} key={role.toLowerCase()} />
    }
    return <></>
  }

  return { formattedRoles, getRolePills, getRoleIcons }
};

export default useFormatRoles;