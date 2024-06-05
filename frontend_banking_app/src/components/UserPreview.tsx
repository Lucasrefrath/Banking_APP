import React, {useState} from 'react';
import {FullUserData} from "../types/Types";
import useFormat from "../utils/useFormat";
import UserDetailsPopUp from "./pop-ups/UserDetailsPopUp";
import useUserRoles from "../hooks/request/useUserRoles";

interface UserPreviewProps {
  userData: FullUserData
}

const UserPreview = ({ userData }: UserPreviewProps) => {
  const { getRoleObjects } = useUserRoles();
  const { formatBalanceSum, formatActiveAccountCount } = useFormat();
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false);

  return (
    <li key={userData.user.id} className="flex justify-between items-center gap-x-6 py-2">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0">
          <div>
            <span className={"flex items-center gap-2"}>
              <h4>{userData.user.username}</h4>
              <div className={"flex gap-1 items-center"}>
                {getRoleObjects(userData.user.roles).map((role) => role.icon)}
              </div>
            </span>
            <small>{formatActiveAccountCount(userData)}</small>
          </div>
          <button
                  className={"type-see-more"}
                  onClick={() => setPopUpOpen(true)}
          >
            see more
          </button>
        </div>
      </div>
      <div className={"flex items-center"}>
        <p className={"pill-gray"}>{formatBalanceSum(userData.accounts)} €</p>
      </div>
      <UserDetailsPopUp userDetail={userData} close={() => setPopUpOpen(false)} isOpen={popUpOpen} />
    </li>
  );
};

export default UserPreview;