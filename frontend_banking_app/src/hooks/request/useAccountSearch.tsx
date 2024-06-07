import {API_URLS_V1} from "../../const/GlobalConst";
import {useEffect, useState} from "react";
import {AccountSearchResult} from "../../types/Types";
import {useParams} from "react-router-dom";
import useAuthContext from "../contextHook/useAuthContext";

const useAccountSearch = (query: string) => {
  const { accountId} = useParams();
  const { refreshAuth } = useAuthContext();
  const [results, setResults] = useState<AccountSearchResult | undefined>(undefined);

  useEffect(() => {
    if(query === "") {
      setResults(undefined)
    }
    const timeout = setTimeout(() => {
      if(query !== "") {
        handleRequest()
      }
    }, 500)

    return () => clearTimeout(timeout);
  }, [ query ]);

  const handleRequest = async (): Promise<void> => {

    try {
      const response = await fetch(`${API_URLS_V1.fastSearch}/accounts`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: query,
          originAccountId: accountId
        })
      });

      if(response.status === 401) {
        refreshAuth();
        const message = await response.text();
        throw new Error(message)
      }

      if(response.status !== 200) {
        throw new Error("Ein unerwarteter Fehler ist aufgetreten...");
      }

      const data: AccountSearchResult = await response.json();
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  }

  return { results }
};

export default useAccountSearch;