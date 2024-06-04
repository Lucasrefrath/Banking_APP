import React from 'react';
import {FullUserData} from "../../types/Types";
import useFormatRoles from "../../utils/useFormatRoles";
import CustomPopUp from "../customUI/CustomPopUp";
import useFormat from "../../utils/useFormat";
import UserAccountAdminActionDropdown from "../customUI/UserAccountAdminActionDropdown";

interface UserDetailsPopUpProps {
  userDetail: FullUserData,
  close: () => void,
  isOpen: boolean,
}

const UserDetailsPopUp = ({ isOpen, close, userDetail}: UserDetailsPopUpProps) => {
  const { getRolePills } = useFormatRoles(userDetail);
  const { formatBalance } = useFormat();

  return (
    <CustomPopUp isOpen={isOpen} close={close}>
      <h3>
        Userinformation
      </h3>
      <small>{userDetail.user.username}</small>

      <section>
        <label>Roles</label>
        <div className={"flex items-center gap-2"}>
          {getRolePills().map((role) => <div key={role.key}>{role}</div>)}
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

      <button className={"type-primary mt-4"} onClick={close}>Done</button>
    </CustomPopUp>
  );
};

export default UserDetailsPopUp;