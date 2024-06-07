import React from 'react';
import TabList from "../components/customUI/TabList";
import {PROFILE_SETTINGS_OPTIONS} from "../const/GlobalConst";
import useUserSessions from "../hooks/request/useUserSessions";
import {ProfileSettingsContext} from "../const/Context";

const ProfileSettingsPage = () => {
  const { sessionData, terminateSession, handleRequest, isPending} = useUserSessions();

  if(isPending) return <p>Loading</p>

  const reloadData = () => {
    handleRequest();
  }

  return (
    <ProfileSettingsContext.Provider value={{
      sessionData: sessionData,
      terminateSession
    }}>
      <h3>Profile Settings</h3>
      <TabList listItems={PROFILE_SETTINGS_OPTIONS} reloadAction={reloadData} />
    </ProfileSettingsContext.Provider>
  );
};

export default ProfileSettingsPage;