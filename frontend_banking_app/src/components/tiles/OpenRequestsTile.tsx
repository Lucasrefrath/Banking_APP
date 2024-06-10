import React from 'react';
import useAdminContext from "../../hooks/contextHook/useAdminContext";
import OpenRequestPreview from "../OpenRequestPreview";

const OpenRequestsTile = () => {
  const { openRequestData} = useAdminContext();

  return (
    <ol className={"divide-y"}>
      {openRequestData?.map((request) => <OpenRequestPreview request={request} key={request.id}/>)}
      {openRequestData?.length === 0 && <p>No open requests</p>}
    </ol>
  );
};

export default OpenRequestsTile;