import React from 'react';
import useAdminContext from "../hooks/contextHook/useAdminContext";
import UserPreview from "./UserPreview";

const UserManagementTile = () => {
  const { userData } = useAdminContext();

  if(userData === undefined) {
    return <p>No userData</p>;
  }

  return (
    <ol className={"divide-y"}>
      {userData.map((user) => {
        return <UserPreview userData={user} key={user.user.id}/>
      })}
    </ol>
  );
};

export default UserManagementTile;