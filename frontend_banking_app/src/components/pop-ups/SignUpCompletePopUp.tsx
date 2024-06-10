import React, {useEffect, useState} from 'react';
import CustomPopUp from "../customUI/CustomPopUp";
import {RequestSignUpResponse} from "../../types/Request-Response";
import {Link, useNavigate} from "react-router-dom";
import {CheckIcon} from "@heroicons/react/24/outline";
import useTimer from "../../hooks/useTimer";

interface SignUpCompletePopUpProps {
  requestResponse: RequestSignUpResponse | undefined
}

const SignUpCompletePopUp = ({ requestResponse}: SignUpCompletePopUpProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { timeLeft, start, reset} = useTimer(() => handleClose());

  useEffect(() => {
    if(requestResponse !== undefined) {
      start(25)
      setOpen(true);
    };
  }, [ requestResponse ]);

  const handleClose = () => {
    reset();
    setOpen(false);
    navigate("/");
  }

  return (
    <CustomPopUp isOpen={open} close={handleClose}>
      <div className={"flex justify-center items-center text-center"}>
        <span className={"bg-green-200 pill-round "}>
          <CheckIcon className={"icon-big text-green-700 "}/>
        </span>
      </div>
      <section className={"text-center"}>
        <h3>Your Request was sent successfully</h3>
      </section>
      <section className={"text-center text-wrap"}>
        <p>You can check the status of your request <Link className={"text-link"} to={`/checkSignUp/${requestResponse?.id}`}>here</Link></p>
      </section>
      <section className={"items-center justify-center flex mt-5"}>
        <button className={"type-primary"} onClick={handleClose}>Okay</button>
      </section>
      <section className={"text-center mt-1"}>
        <small>closes in {timeLeft}s</small>
      </section>
    </CustomPopUp>
  );
};

export default SignUpCompletePopUp;