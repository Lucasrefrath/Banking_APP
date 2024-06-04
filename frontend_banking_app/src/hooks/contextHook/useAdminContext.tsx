import {useContext} from "react";
import {AdminContext} from "../../const/Context";

const useAdminContext = () => {
  const AdminData = useContext(AdminContext);
  if(AdminData === undefined) throw new Error("Admincontext is undefined")
  return AdminData;
};

export default useAdminContext;