import React from 'react';
import CustomPopUp from "../customUI/CustomPopUp";
import {DevicePhoneMobileIcon} from "@heroicons/react/24/solid";
import useProfileContext from "../../hooks/contextHook/useProfileContext";
import {PopUpType} from "../../types/Enums";

const ExpectingApprovalPopUp = () => {
  const {isPopUpOpen, closePopUp} = useProfileContext();
  return (
    <CustomPopUp isOpen={isPopUpOpen(PopUpType.EXPECTING_APPROVAL)} close={() => closePopUp(PopUpType.EXPECTING_APPROVAL)}>
        <div className={"flex justify-center text-center items-center"}>
            <span className={"bg-blue-200 pill-round p-3"}>
              <DevicePhoneMobileIcon className={"icon-mid text-blue-500 "}/>
            </span>
        </div>
        <section className={"text-center"}>
          <h3>Expecting Approval...</h3>
        </section>
        <section className={"text-center text-wrap"}>
          <p>Open your Mobile Authentication app to approve this transaction.</p>
        </section>
        <section className={"items-center justify-center flex mt-5"}>
          <button className={"type-secondary-outline"} onClick={() => closePopUp(PopUpType.EXPECTING_APPROVAL)}>discard transaction</button>
        </section>
    </CustomPopUp>
  );
};

export default ExpectingApprovalPopUp;