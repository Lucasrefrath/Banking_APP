import React, {ReactElement} from 'react';
import {Roles} from "../types/Enums";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {RoleObject} from "../types/Types";
import useAuth from "../hooks/useAuth";
import useAuthContext from "../hooks/contextHook/useAuthContext";
import useUserRoles from "../hooks/request/useUserRoles";

interface RolePillProps {
  role: RoleObject,
  userId: number
  showActionX?: boolean
  onClick? : () => void
}

const RolePill = ({ role, onClick, showActionX = false, userId }: RolePillProps) => {
  const { userDetails } = useAuthContext();

  return (
    <div className={"pill-gray items-center"}>
      {role.icon}
      <small>{role.label}</small>
      {(showActionX && (role.enum !== Roles.USER && !(userDetails?.id === userId && role.enum === Roles.ADMIN))) && <XMarkIcon className={"icon-small cursor-pointer"} onClick={onClick}/>}
    </div>
  );
};

export default RolePill;