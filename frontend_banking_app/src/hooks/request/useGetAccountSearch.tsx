import {API_URLS_V1} from "../../const/GlobalConst";
import {useEffect, useState} from "react";
import {AccountSearchResult} from "../../types/Types";

const useGetAccountSearch = (query: string) => {
  const [results, setResults] = useState<AccountSearchResult | undefined>(undefined);

  useEffect(() => {
    if(query === "") {
      setResults(undefined)
    }
    const timeout = setTimeout(() => {
      if(query !== "") {
        handleRequest()
      }
    }, 700)

    return () => clearTimeout(timeout);
  }, [ query ]);

  const handleRequest = async (): Promise<void> => {

    try {
      const response = await fetch(`${API_URLS_V1.fastSearch}/accounts?q=${query}?fromAcc=`, { //TODO: current accountID
        method: 'GET',
        credentials: "include",
      });

      if(response.status === 403) {
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

export default useGetAccountSearch;