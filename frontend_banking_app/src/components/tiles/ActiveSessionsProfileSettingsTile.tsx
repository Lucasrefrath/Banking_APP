import React from 'react';
import useProfileSettingsContext from "../../hooks/contextHook/useProfileSettingsContext";
import SessionPreview from "../SessionPreview";

const ActiveSessionsProfileSettingsTile = () => {
  const { sessionData, terminateSession} = useProfileSettingsContext();

  return (
    <ol className={"divide-y"}>
      {sessionData?.map((session) => <SessionPreview sessionData={session} terminateSession={terminateSession} />)}
    </ol>
  );
};

export default ActiveSessionsProfileSettingsTile;