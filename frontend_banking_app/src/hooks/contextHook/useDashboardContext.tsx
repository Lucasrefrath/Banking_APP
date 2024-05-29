import {useContext} from "react";
import {DashBoardContext} from "../../const/Context";

const useDashboardContext = () => {
  const DashBoardData = useContext(DashBoardContext);
  if(DashBoardData === undefined) throw new Error("DashboardContext undefined");
  return DashBoardData;
};

export default useDashboardContext;