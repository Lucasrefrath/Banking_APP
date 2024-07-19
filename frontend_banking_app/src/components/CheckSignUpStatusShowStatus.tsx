import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useSignUp from "../hooks/request/useSignUp";
import {BellSnoozeIcon, CheckIcon, ClockIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {ApprovalStatus} from "../types/Enums";
import useFormat from "../utils/useFormat";
import useTimeSince from "../utils/useTimeSince";

const CheckSignUpStatusShowStatus = () => {
  const { checkStatus, requestStatusData, isPending} = useSignUp();
  const navigate = useNavigate();
  const { id } = useParams();
  const { formatTime } = useFormat();
  const { getDay } = useTimeSince();

  useEffect(() => {
    if(id !== undefined) {
      checkStatus(id, () => console.log("check Status"));
    }
  }, []);

  if(isPending) return (
    <p>Loading...</p>
  );

  if(requestStatusData === undefined) return (
    <div className={"bg-gray-100 rounded-lg p-5 mt-5"}>
      <div className={"flex justify-center text-center items-center"}>
            <span className={"bg-gray-200 pill-round p-3"}>
              <BellSnoozeIcon className={"icon-mid text-gray-700 "}/>
            </span>
      </div>
      <section className={"text-center"}>
        <h3>No Information</h3>
      </section>
      <section className={"text-center text-wrap"}>
        <p>There is no such Request. Request Sign Up again.</p>
      </section>
      <section className={"items-center justify-center flex mt-5"}>
        <button className={"type-primary"} onClick={() => navigate("/signUp")}>Request Sign Up</button>
      </section>
    </div>
  );

  const getIcon = () => {
    switch (requestStatusData?.status) {
      case ApprovalStatus.PENDING:
        return (
          <div className={"bg-gray-100 rounded-lg p-5 mt-5"}>
            <div className={"flex justify-center text-center items-center"}>
            <span className={"bg-yellow-200 pill-round p-3"}>
              <ClockIcon className={"icon-mid text-yellow-700 "}/>
            </span>
            </div>
            <section className={"text-center"}>
              <h3>Request Pending</h3>
            </section>
            <section className={"text-center text-wrap"}>
              <p>Your request has not been processed yet. Check again later.</p>
            </section>
            <section className={"items-center justify-center flex mt-5"}>
              <button className={"type-primary"} onClick={() => navigate("/")}>Go Back Home</button>
          </section>
        </div>
      );
      case ApprovalStatus.APPROVED:
        return (
          <div className={"bg-gray-100 rounded-lg p-5 mt-5"}>
            <div className={"flex justify-center text-center items-center"}>
            <span className={"bg-green-200 pill-round p-3"}>
              <CheckIcon className={"icon-mid text-green-700 "}/>
            </span>
            </div>
            <section className={"text-center"}>
              <h3>Request Approved</h3>
            </section>
            <section className={"text-center text-wrap"}>
              <p>Your request has been approved by us. You can now login with your credentials.</p>
            </section>
            <section className={"items-center justify-center flex mt-5"}>
              <button className={"type-primary"} onClick={() => navigate("/login")}>Log In</button>
            </section>
          </div>
        );
      case ApprovalStatus.REJECTED:
        return (
          <div className={"bg-gray-100 rounded-lg p-5 mt-5"}>
            <div className={"flex justify-center text-center items-center"}>
            <span className={"bg-red-200 pill-round p-3"}>
              <XMarkIcon className={"icon-mid text-red-700 "}/>
            </span>
            </div>
            <section className={"text-center"}>
              <h3>Request Rejected</h3>
            </section>
            <section className={"text-center text-wrap"}>
              <p>Your request has been rejected by us. Request Sign Up again.</p>
            </section>
            {requestStatusData.rejectionMessage && (
              <section className={"text-center text-wrap"}>
                <small>"{requestStatusData.rejectionMessage}"</small>
              </section>
            )}
            <section className={"items-center justify-center flex mt-5"}>
              <button className={"type-primary"} onClick={() => navigate("/signUp")}>Request Sign Up</button>
            </section>
          </div>
        );
    }
  }

  return (
    <>
      <div className={"flex justify-center items-center text-center"}>
        {getIcon()}
      </div>
      {requestStatusData.processedAt ? (
        <small className={"flex justify-center text-center mt-3"}>Updated {getDay(requestStatusData.processedAt)} at {formatTime(requestStatusData.processedAt)}</small>
      ) : (
        <small className={"flex justify-center text-center mt-3"}>Created {getDay(requestStatusData.createdAt)} at {formatTime(requestStatusData.createdAt)}</small>
      )}
    </>
  );
};

export default CheckSignUpStatusShowStatus;