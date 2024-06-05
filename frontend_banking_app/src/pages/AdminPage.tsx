import React from 'react';
import TabList from "../components/customUI/TabList";
import {AdminContext} from "../const/Context";
import useAllUsers from "../hooks/request/useAllUsers";
import {ADMIN_OPTIONS} from "../const/GlobalConst";

const AdminPage = () => {
  const {isPending, userData, handleDeactivateAccount, handleActivateAccount, handleUpdateUserRoles} = useAllUsers();

  if(isPending) return <p>Loading...</p>

  return (
      <AdminContext.Provider value={{
        userData: userData,
        handleDeactivateAccount,
        handleActivateAccount,
        handleUpdateUserRoles
      }}>
        <h2 className={"mb-4"}>AdminPage</h2>
        <TabList listItems={ADMIN_OPTIONS}/>
      </AdminContext.Provider>
  );
};

export default AdminPage;