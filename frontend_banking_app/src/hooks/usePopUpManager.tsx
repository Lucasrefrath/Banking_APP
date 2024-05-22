import {useState} from "react";
import {PopUpType} from "../types/Enums";

const usePopUpManager = () => {
  const [activePopUp, setActivePopUp] = useState<PopUpType | undefined>(undefined);

  const openPopUp = (actionType: PopUpType) => {
    setActivePopUp(actionType)
  }

  const isPopUpOpen = (actionType: PopUpType): boolean => {
    return activePopUp === actionType;
  }

  const closePopUp = (actionType: PopUpType) => {
    if(isPopUpOpen(actionType)) {
      setActivePopUp(undefined)
    }
  }

  return {openPopUp, closePopUp, isPopUpOpen};
};

export default usePopUpManager;