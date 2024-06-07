import {useEffect, useState} from "react";
import {Roles} from "../types/Enums";

const useManageUserRolesChanges = (defaultValue: Roles[]) => {
  const [userRoles, setUserRoles] = useState<Roles[]>(() => defaultValue);
  const [hasValueChanged, setHasValueChanged] = useState<boolean>(false)

  useEffect(() => {
    setHasValueChanged(userRoles.toString() !== defaultValue.toString());
  }, [ userRoles ]);

  const resetValues = () => {
    setUserRoles(defaultValue)
  }

  const addRole = (role: Roles) => {
    if(userRoles.includes(role)) return;
    setUserRoles([...userRoles, role])
  }

  const deleteRole = (role: Roles) => {
    setUserRoles(userRoles.filter((roles) => roles !== role))
  }

  return { userRoles, hasValueChanged, resetValues, deleteRole, addRole }
};

export default useManageUserRolesChanges;