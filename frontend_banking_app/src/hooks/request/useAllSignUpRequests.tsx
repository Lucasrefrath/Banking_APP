import {API_URLS_V1} from "../../const/GlobalConst";
import {
  ApproveRequestRequest,
  RejectRequestRequest,
  RequestSignUpResponse
} from "../../types/Request-Response";
import {useEffect, useState} from "react";

const useAllSignUpRequests = () => {
  const [isPending, setIsPending] = useState<boolean>(false)
  const [openRequests, setOpenRequests] = useState<RequestSignUpResponse[] | undefined>(undefined)

  useEffect(() => {
    setIsPending(true)
    getAllOpen()
  }, []);

  const deleteOneLocal = (request: RequestSignUpResponse) => {
    setOpenRequests((prevState) => prevState?.filter((onerequest) => onerequest.id !== request.id))
  }

  const getAllOpen = async (): Promise<void> => {
    try {
      const response = await fetch(API_URLS_V1.userSignUp + "/open", {
        method: 'GET',
        credentials: "include",
      });

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data: RequestSignUpResponse[] = await response.json();
      setOpenRequests(data)
      setIsPending(false)
    } catch (error) {
      console.log(error);
      setIsPending(false)
    }
  }

  const rejectRequest = async (payload: RejectRequestRequest, actionAfter: () => void): Promise<void> => {
    try {
      const response = await fetch(API_URLS_V1.userSignUp + "/reject", {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data: string = await response.text();
      actionAfter();
    } catch (error) {
      console.log(error);
    }
  }

  const approveRequest = async (payload: ApproveRequestRequest, actionAfter: () => void): Promise<void> => {
    try {
      const response = await fetch(API_URLS_V1.userSignUp + "/approve", {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data: string = await response.text();
      actionAfter();
    } catch (error) {
      console.log(error);
    }
  }

  return {isPending, getAllOpen, openRequests, rejectRequest, approveRequest, deleteOneLocal}
};

export default useAllSignUpRequests;