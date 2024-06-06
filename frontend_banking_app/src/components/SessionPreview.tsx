import React from 'react';
import {Session} from "../types/Types";
import useFormat from "../utils/useFormat";
import {ShieldCheckIcon} from "@heroicons/react/24/solid";
import {CloudIcon, KeyIcon, PowerIcon} from "@heroicons/react/24/outline";
import useTimeSince from "../utils/useTimeSince";
import DestructiveButton from "./customUI/DestructiveButton";

interface SessionPreviewProps {
  sessionData: Session,
  terminateSession: (sessionId: string) => void
}

const SessionPreview = ({ sessionData, terminateSession }: SessionPreviewProps) => {
  const { formatTime } = useFormat();
  const { getTimeSince, getDay, getMinutesSince } = useTimeSince();

  return (
    <li key={sessionData.id} className="flex justify-between items-center gap-x-6 py-2">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0">
          <div>
            <span className={"flex items-center gap-2"}>
              <p>{sessionData.id}</p>
              {getMinutesSince(sessionData.lastAccessedTime) < 5 ? (
                <div className={"pill-gray"}>
                  <ShieldCheckIcon className={"icon text-green-700 flex items-center"}/>
                  <small>active</small>
                </div>
              ) : (
                <div className={"pill-gray"}>
                  <ShieldCheckIcon className={"icon text-orange-500 flex items-center"}/>
                  <small>inactive</small>
                </div>
              )}
            </span>
            <span className={"flex items-center gap-2"}>
              <PowerIcon className={"icon-small text-gray-700"}/>
              <small>{getDay(sessionData.creationTime)} at {formatTime(sessionData.creationTime)}</small>
            </span>
            <span className={"flex items-center gap-2"}>
              <CloudIcon className={"icon-small text-gray-700"}/>
              <small>{getTimeSince(sessionData.lastAccessedTime)}</small>
            </span>
          </div>
        </div>
      </div>
      {sessionData.isCurrent ? (
        <button className={"type-secondary-outline"} disabled={true}>
          current session
        </button>
      ) : (
        <DestructiveButton affirmationMessage={"Do you really want to terminate this session?"} onClick={() => terminateSession(sessionData.id)}>
          <KeyIcon className={"icon"} />
          terminate Session
        </DestructiveButton>
      )}
    </li>
  );
};

export default SessionPreview;