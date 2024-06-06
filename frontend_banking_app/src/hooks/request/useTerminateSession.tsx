import {API_URLS_V1} from "../../const/GlobalConst";
import useAuthContext from "../contextHook/useAuthContext";

const useTerminateSession = () => {
  const { refreshAuth } = useAuthContext();


  const handleTerminateSession = async (sessionId: string, actionAfter?: () => void): Promise<void> => {
    try {
      const response = await fetch(API_URLS_V1.sessions + "/terminate/" + sessionId, {
        method: 'DELETE',
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

      const data: string = await response.text();
      actionAfter && actionAfter();
    } catch (error) {
      console.log(error);
    }
  }

  return { handleTerminateSession }
};

export default useTerminateSession;