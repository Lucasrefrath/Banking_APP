import React from 'react';
import {AccountHistory} from "../types/Types";
import HistoryPreviewItem from "./HistoryPreviewItem";
import useProfileContext from "../hooks/contextHook/useProfileContext";

const AccountHistoryList = () => {
  const { userAccountHistory} = useProfileContext();

  return (
    <div className={"mt-5 mb-5"}>
      <p className={"text-2xl font-bold pt-5 px-3"}>History</p>
      {(userAccountHistory === undefined || userAccountHistory.length === 0) ? (
        <p className={"px-3 font-extralight text-sm"}>no transactions yet</p>
      ) : (
        <div className={"pt-2 pb-5"}>
          <ul className="divide-y divide-gray-100 bg-gray-200 rounded-lg px-4">
            {userAccountHistory.map((history: AccountHistory) => <HistoryPreviewItem history={history} key={history.id}/>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountHistoryList;