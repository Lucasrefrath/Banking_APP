import React from 'react';
import {useParams} from "react-router-dom";
import CheckSignUpStatusSearch from "../components/CheckSignUpStatusSearch";
import CheckSignUpStatusShowStatus from "../components/CheckSignUpStatusShowStatus";

const CheckSignUpStatusPage = () => {
  const { id } = useParams();

  if(id === undefined) return (
    <CheckSignUpStatusSearch />
  );

  return (
    <CheckSignUpStatusShowStatus />
  );
};

export default CheckSignUpStatusPage;