import {API_URLS_V1} from "../../const/GlobalConst";
import {SimpleAccountDetails} from "../../types/Types";
import {CreateAccountRequest} from "../../types/Request-Response";
import useDashboardContext from "../contextHook/useDashboardContext";
import useAuthContext from "../contextHook/useAuthContext";

const useCreateAccount = () => {
  const { pushNewAccount } = useDashboardContext();
  const { refreshAuth } = useAuthContext();

  const handleRequest = async (request: CreateAccountRequest): Promise<void> => {

    try {
      const response = await fetch(API_URLS_V1.accounts + "/create", {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request),
      });

      if(response.status === 401) {
        refreshAuth();
        throw new Error("Unauthorized")
      }

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data: SimpleAccountDetails = await response.json();
      pushNewAccount(data);
    } catch (error) {
      console.log(error);
    }
  }

  return {handleRequest}
};

export default useCreateAccount;