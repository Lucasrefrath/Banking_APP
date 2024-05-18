import {useEffect} from 'react';
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const LogOutPage = () => {
  const AuthData = useAuth();
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