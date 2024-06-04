import React from 'react';
import {AccountHistory} from "../types/Types";
import HistoryPreviewItem from "./HistoryPreviewItem";
import useProfileContext from "../hooks/contextHook/useProfileContext";

const AccountHistoryList = () => {
  const { userAccountHistory} = useProfileContext();

  return (
    <div className={"mt-5 mb-5"}>
      <h3 className={"pt-5 px-3"}>History</h3>
      {(userAccountHistory === undefined || userAccountHistory.length === 0) ? (
        <small className={"px-3"}>no transactions yet</small>
      ) : (
        <section className={"pt-2 pb-5"}>
          <ul className="divide-y divide-gray-100 bg-gray-200 rounded-lg px-4">
            {userAccountHistory.map((history: AccountHistory) => <HistoryPreviewItem history={history} key={history.id}/>)}
          </ul>
        </section>
      )}
    </div>
  );
};

export default AccountHistoryList;