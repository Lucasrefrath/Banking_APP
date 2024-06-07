import React from 'react';
import TabList from "../components/customUI/TabList";
import {AdminContext} from "../const/Context";
import useAllUsers from "../hooks/request/useAllUsers";
import {ADMIN_OPTIONS} from "../const/GlobalConst";
import useAllSessions from "../hooks/request/useAllSessions";

const AdminPage = () => {
  const {isPending, userData, handleDeactivateAccount, handleActivateAccount, handleUpdateUserRoles, handleRequest: handleAllUsersRequest} = useAllUsers();
  const { sessionData, isPending: sessionIsPending, terminateSession, handleRequest: handleAllSessionsRequest } = useAllSessions();

  if(isPending || sessionIsPending) return <p>Loading...</p>

  const reloadData = () => {
    handleAllUsersRequest()
    handleAllSessionsRequest()
  }

  return (
      <AdminContext.Provider value={{
        userData: userData,
        sessionData: sessionData,
        handleDeactivateAccount,
        handleActivateAccount,
        handleUpdateUserRoles,
        terminateSession
      }}>
        <h2 className={"mb-4"}>AdminPage</h2>
        <TabList listItems={ADMIN_OPTIONS} reloadAction={reloadData}/>
      </AdminContext.Provider>
  );
};

export default AdminPage;