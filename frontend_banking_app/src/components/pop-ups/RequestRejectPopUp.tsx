import React, {useState} from 'react';
import CustomPopUp from "../customUI/CustomPopUp";
import {RequestSignUpResponse} from "../../types/Request-Response";
import useAllSignUpRequests from "../../hooks/request/useAllSignUpRequests";
import useAdminContext from "../../hooks/contextHook/useAdminContext";

interface RequestApprovePopUpProps {
  isOpen: boolean,
  close: () => void,
  request: RequestSignUpResponse
}

const RequestRejectPopUp = ({ isOpen, close, request}: RequestApprovePopUpProps) => {
  const [reason, setReason] = useState<string>("")
  const { rejectRequest } = useAllSignUpRequests();
  const { deleteOneRequestLocal } = useAdminContext();

  const handleReject = () => {
    rejectRequest({
      requestId: request.id,
      reason: reason
    }, () => {
      deleteOneRequestLocal(request)
      close()
    })
  }

  return (
    <CustomPopUp isOpen={isOpen} close={close}>
      <h3>Reject Request</h3>
      <small>{request.username}</small>
      <section>
        <label>Reason</label>
        <textarea
        className={""}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder={"enter reason for rejection"}
        />
      </section>
      <section className={"flex items-center gap-2"}>
        <button className={"type-secondary"} onClick={close}>Cancel</button>
        <button className={"type-primary"} onClick={handleReject}>Reject</button>
      </section>
    </CustomPopUp>
  );
};

export default RequestRejectPopUp;