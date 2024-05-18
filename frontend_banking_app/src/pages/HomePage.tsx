import React from 'react';
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const AuthData = useAuth();
    const navigate = useNavigate();
    return (
        <div>
            {AuthData?.isAuthenticated ? (
                <>
                    <div className={"text-4xl pb-4 font-bold"}>Home ({AuthData?.userDetails?.username})</div>
                    <p>Userdata: {JSON.stringify(AuthData?.userDetails)}</p>
                </>
            ) : (
              <>
                  <h1 className={"text-4xl pb-4 font-bold"}>You are not logged in</h1>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex w-52 h-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                      goto Login
                  </button>
              </>

            )}
        </div>
    );
};

export default HomePage;