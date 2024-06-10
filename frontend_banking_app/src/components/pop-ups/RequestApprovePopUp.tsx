import React from 'react';
import CustomPopUp from "../customUI/CustomPopUp";
import {RequestSignUpResponse} from "../../types/Request-Response";
import useAllSignUpRequests from "../../hooks/request/useAllSignUpRequests";
import useAdminContext from "../../hooks/contextHook/useAdminContext";

interface RequestApprovePopUpProps {
  isOpen: boolean,
  close: () => void,
  request: RequestSignUpResponse
}

const RequestApprovePopUp = ({ isOpen, close, request}: RequestApprovePopUpProps) => {
  const { approveRequest } = useAllSignUpRequests();
  const { deleteOneRequestLocal } = useAdminContext();

  const handleApprove = () => {
    approveRequest({
      requestId: request.id
    }, () => {
      deleteOneRequestLocal(request);
      close();
    })
  }

  return (
    <CustomPopUp isOpen={isOpen} close={close}>
      <h3>Approve Request</h3>
      <small>{request.username}</small>
      <section className={"flex items-center gap-2"}>
        <button className={"type-secondary"} onClick={close}>Cancel</button>
        <button className={"type-primary"} onClick={handleApprove}>Approve</button>
      </section>
    </CustomPopUp>
  );
};

export default RequestApprovePopUp;