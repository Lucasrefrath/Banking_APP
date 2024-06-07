import {API_URLS_V1} from "../../const/GlobalConst";
import {FullUserData, Session, SimpleAccountDetails, UserSession} from "../../types/Types";
import {useEffect, useState} from "react";
import useAuthContext from "../contextHook/useAuthContext";
import useTerminateSession from "./useTerminateSession";

const useAllSessions = () => {
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<any>(undefined);
  const [sessionData, setSessionData] = useState<UserSession[] | undefined>(undefined);
  const { refreshAuth } = useAuthContext();
  const { handleTerminateSession } = useTerminateSession();

  useEffect(() => {
    setIsPending(true)
    handleRequest()
  }, []);

  const handleRequest = async (): Promise<void> => {
    try {
      const response = await fetch(API_URLS_V1.sessions + "/allSessions", {
        method: 'GET',
        credentials: "include",
      });

      if(response.status === 401) {
        refreshAuth();
        const message = await response.text();
        throw new Error(message)
      }

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data: UserSession[] = await response.json();
      setSessionData(data);
      setIsPending(false);
    } catch (error) {
      setError(error)
      console.log(error);
    }
    setIsPending(false);
  }

  const deleteSessionLocal = (sessionId: string ) => {
    const newSessionData = sessionData?.map((userSession: UserSession): UserSession => {
      return {
        user: userSession.user,
        sessions: userSession.sessions.filter((session: Session) => session.id !== sessionId)
      }
    });

    setSessionData(newSessionData);
  }

  const terminateSession = async (sessionId: string): Promise<void> => {
    await handleTerminateSession(sessionId, () => deleteSessionLocal(sessionId));
  }

  return { isPending, error, sessionData, terminateSession, handleRequest }
};

export default useAllSessions;