import {useContext} from 'react';
import {ProfileContext} from "../../const/Context";
import {ProfileData} from "../../types/Types";

const useProfileContext = (): ProfileData => {
    const ProfileData = useContext(ProfileContext);
    if(ProfileData === undefined) throw  new Error("ProfileContext undefined");
    return ProfileData;
};

export default useProfileContext;