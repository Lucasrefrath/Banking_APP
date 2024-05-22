import {useEffect} from 'react';
import useAuthContext from "../hooks/useAuthContext";
import {useNavigate} from "react-router-dom";

const LogOutPage = () => {
  const AuthData = useAuthContext();
  const navigate = useNavigate()

  useEffect(() => {
    AuthData?.logout()
    navigate("/")
  }, []);


  return (
    <>
    </>
  );
};

export default LogOutPage;