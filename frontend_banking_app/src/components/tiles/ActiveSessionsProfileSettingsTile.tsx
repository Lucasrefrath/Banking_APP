import React from 'react';
import useProfileSettingsContext from "../../hooks/contextHook/useProfileSettingsContext";
import SessionPreview from "../SessionPreview";

const ActiveSessionsProfileSettingsTile = () => {
  const { sessionData, terminateSession} = useProfileSettingsContext();

  return (
    <div>
      {sessionData?.map((session) => <SessionPreview sessionData={session} terminateSession={terminateSession} />)}
    </div>
  );
};

export default ActiveSessionsProfileSettingsTile;