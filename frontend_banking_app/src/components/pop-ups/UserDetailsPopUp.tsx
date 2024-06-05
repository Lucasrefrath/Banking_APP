import React from 'react';
import {FullUserData} from "../../types/Types";
import CustomPopUp from "../customUI/CustomPopUp";
import useFormat from "../../utils/useFormat";
import UserAccountAdminActionDropdown from "../customUI/UserAccountAdminActionDropdown";
import useAdminContext from "../../hooks/contextHook/useAdminContext";
import AddRoleDropdown from "../customUI/AddRoleDropdown";
import useManageUserRolesChanges from "../../hooks/useManageUserRolesChanges";
import useUserRoles from "../../hooks/request/useUserRoles";
import RolePill from "../RolePill";

interface UserDetailsPopUpProps {
  userDetail: FullUserData,
  close: () => void,
  isOpen: boolean,
}

const UserDetailsPopUp = ({ isOpen, close, userDetail}: UserDetailsPopUpProps) => {
  const { hasValueChanged, userRoles, resetValues, addRole, deleteRole} = useManageUserRolesChanges(userDetail.user.roles)
  const { formatBalance } = useFormat();
  const { handleUpdateUserRoles } = useAdminContext();
  const { getRoleObjects } = useUserRoles();

  const handleCancel = () => {
    close();
    resetValues();
  }

  return (
    <CustomPopUp isOpen={isOpen} close={close}>
      <h3>
        Userinformation
      </h3>
      <small>{userDetail.user.username}</small>

      <section>
        <label>Roles</label>
        <div className={"flex items-center gap-2 flex-wrap"}>
          {getRoleObjects(userRoles).map((role) => <RolePill role={role} userId={userDetail.user.id} showActionX={true} onClick={() => deleteRole(role.enum)}/>)}
          <AddRoleDropdown userRoles={userRoles} addRole={addRole}/>
        </div>
      </section>

      <section>
        <label>Accounts</label>
        <ol>
          {userDetail.accounts.map((account) => {
            return (
              <li className={"flex justify-between pill-gray mt-2 py-2"} key={account.id}>
                <div className={"flex flex-col items-start"}>
                  <div className={"flex items-center gap-2"}>
                    <small className={"p-0 m-0 font-semibold"}>{account.name}</small>
                    {!account.active && <div className={"pill-red bg-red-300 text-xs px-1.5 py-0.5"}>deactivated</div>}
                  </div>
                  <small className={"font-extralight"}>{formatBalance(account.balance)} €</small>
                </div>
                <UserAccountAdminActionDropdown account={account} />
              </li>
            );
          })}
        </ol>
      </section>

        {hasValueChanged ? (
          <section className={"flex gap-2"}>
            <button className={"type-secondary"} onClick={handleCancel}>cancel</button>
            <button className={"type-primary"} onClick={() => handleUpdateUserRoles(userRoles, userDetail.user.id, close)}>save changes</button>
          </section>
        ) : (
          <section>
            <button className={"type-primary"} onClick={close}>Done</button>
          </section>
        )}
    </CustomPopUp>
  );
};

export default UserDetailsPopUp;