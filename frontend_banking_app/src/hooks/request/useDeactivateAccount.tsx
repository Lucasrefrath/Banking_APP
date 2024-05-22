import {API_URLS_V1} from "../../const/GlobalConst";
import {DeleteAccountRequest} from "../../types/Request-Response";
import {useNavigate} from "react-router-dom";

const useDeactivateAccount = () => {
  const navigate = useNavigate();

  const handleDelete = async (request: DeleteAccountRequest): Promise<void> => {

    try {
      const response = await fetch(API_URLS_V1.accounts + "/deactivate", {
        method: 'DELETE',
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
      navigate("/dashboard")
    } catch (error) {
      console.log(error);
    }
  }

  return {handleDelete}
};

export default useDeactivateAccount;