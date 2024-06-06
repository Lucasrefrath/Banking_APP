import React from 'react';
import useAdminContext from "../../hooks/contextHook/useAdminContext";
import {Session} from "../../types/Types";
import SessionPreview from "../SessionPreview";
import useAuthContext from "../../hooks/contextHook/useAuthContext";
import {UserCircleIcon} from "@heroicons/react/24/outline";

const ActiveSessionsTile = () => {
  const { sessionData, terminateSession } = useAdminContext();
  const { userDetails} = useAuthContext();

  return (
    <div>
      {sessionData?.map((sessionD) =>
        sessionD.sessions.length !== 0 && (
          <section>
            <div className={"flex items-center gap-2"}>
              <h4>{sessionD.user.username}</h4>
              {sessionD.user.id === userDetails?.id && <UserCircleIcon className={"icon"}/>}
            </div>
            <ol className={"divide-y"}>
              {sessionD.sessions.map((session: Session) => <SessionPreview sessionData={session} terminateSession={terminateSession} />)}
            </ol>
          </section>
          ))}
    </div>
  );
};

export default ActiveSessionsTile;