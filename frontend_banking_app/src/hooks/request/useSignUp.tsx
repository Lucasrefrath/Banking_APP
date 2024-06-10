import {API_URLS_V1} from "../../const/GlobalConst";
import {CheckSignUpStatusResponse, RequestSignUpRequest, RequestSignUpResponse} from "../../types/Request-Response";
import {useState} from "react";

const useSignUp = () => {
  const [isPending, setIsPending] = useState<boolean>(false)
  const [requestResponse, setRequestResponse] = useState<RequestSignUpResponse | undefined>(undefined)
  const [requestId, setRequestId] = useState<CheckSignUpStatusResponse | undefined>(undefined);
  const [requestStatusData, setRequestStatusData] = useState<RequestSignUpResponse | undefined>(undefined)

  const handleRequest = async (request: RequestSignUpRequest, actionAfter: () => void): Promise<void> => {
    setIsPending(true)
    try {
      const response = await fetch(API_URLS_V1.userSignUp + "/request", {
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

      const data: RequestSignUpResponse = await response.json();
      setRequestResponse(data);
      actionAfter();
      setIsPending(false);
    } catch (error) {
      setIsPending(false)
      console.log(error);
    }
  }

  const getRequestId = async (request: RequestSignUpRequest, actionAfter: (id: number) => void): Promise<void> => {
    setIsPending(true)
    try {
      const response = await fetch(API_URLS_V1.userSignUp + "/getId", {
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

      const data: CheckSignUpStatusResponse = await response.json();
      setRequestId(data)
      actionAfter(data.id);
      setIsPending(false);
    } catch (error) {
      setIsPending(false)
      console.log(error);
    }
  }

  const checkStatus = async (requestId: string, actionAfter: () => void): Promise<void> => {
    setIsPending(true)
    try {
      const response = await fetch(API_URLS_V1.userSignUp + "/checkStatus?id=" + requestId, {
        method: 'GET',
        credentials: "include",
      });

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data: RequestSignUpResponse = await response.json();
      setRequestStatusData(data)
      actionAfter();
      setIsPending(false);
    } catch (error) {
      setIsPending(false)
      console.log(error);
    }
  }

  return {handleRequest, isPending, requestResponse, getRequestId, requestId, checkStatus, requestStatusData}
};

export default useSignUp;