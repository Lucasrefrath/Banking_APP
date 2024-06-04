import {API_URLS_V1} from "../../const/GlobalConst";
import {DeleteAccountRequest} from "../../types/Request-Response";
import {useNavigate} from "react-router-dom";

const useActivateAccount = () => {
  const navigate = useNavigate();

  const handleActivate = async (request: DeleteAccountRequest, redirect: boolean = false): Promise<void> => {

    try {
      const response = await fetch(API_URLS_V1.accounts + "/activate", {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request),
      });

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data = await response.text();
      redirect && navigate("/dashboard")
    } catch (error) {
      console.log(error);
    }
  }

  return {handleActivate}
};

export default useActivateAccount;