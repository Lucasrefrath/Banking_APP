import React, {useContext} from 'react';
import {AccountHistory} from "../types-const/Types";
import {ProfileContext} from "../types-const/Context";
import HistoryPreviewItem from "./HistoryPreviewItem";

const AccountHistoryList = () => {
  const ProfileData = useContext(ProfileContext);

  return (
    <div className={"mt-5"}>
      <p className={"text-2xl font-bold pt-5 px-3"}>History</p>
      {(ProfileData?.userAccountHistory === undefined || ProfileData.userAccountHistory.length === 0) ? (
        <p className={"px-3 font-extralight text-sm"}>no transactions yet</p>
      ) : (
        <div className={"pt-2"}>
          <ul className="divide-y divide-gray-100 bg-gray-200 rounded-lg px-4">
            {ProfileData?.userAccountHistory.map((history: AccountHistory) => <HistoryPreviewItem history={history}/>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountHistoryList;