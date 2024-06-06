import {useContext} from 'react';
import {ProfileSettingsContext} from "../../const/Context";

const useProfileSettingsContext = () => {
  const ProfileSettingsData = useContext(ProfileSettingsContext);
  if(ProfileSettingsData === undefined) throw new Error("ProfileSettingsContext undefined");
  return ProfileSettingsData;
};

export default useProfileSettingsContext;