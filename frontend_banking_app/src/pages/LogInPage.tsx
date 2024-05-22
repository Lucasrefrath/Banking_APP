import React, {useState} from 'react';
import useAuthContext from "../hooks/useAuthContext";
import {Navigate, useNavigate} from "react-router-dom";
import {DEFAULT_USER} from "../const/GlobalConst";
import {ChevronRightIcon} from "@heroicons/react/24/outline";

const LogInPage = () => {
    const AuthData = useAuthContext();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>(DEFAULT_USER.username)
    const [password, setPassword] = useState<string>(DEFAULT_USER.password)

    const handleLogIn = (e: React.FormEvent) => {
        e.preventDefault();
        AuthData?.login({
            username,
            password
        });
        navigate("/");
    }

    if(AuthData?.isAuthenticated) {
        return <Navigate to={"/"} />
    }

    return (
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Sign in to your account
                  </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" onSubmit={(e) => handleLogIn(e)}>
                      <div>
                          <div className="mt-2">
                              <label className={"text-sm/6 font-medium text-black"}>Username</label>
                              <input
                                name="email"
                                id="email"
                                type={"text"}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 bg-black/5 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                placeholder="enter username"
                              />
                          </div>
                      </div>

                      <div>
                          <div className="mt-2">
                              <div className="flex items-center justify-between">
                                  <label className={"text-sm/6 font-medium text-black"}>Password</label>
                                  <div className="text-sm">
                                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                          Forgot password?
                                      </a>
                                  </div>
                              </div>
                              <input
                                name="passowrd"
                                id="password"
                                type={"password"}
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 bg-black/5 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                placeholder="enter password"
                              />
                          </div>
                      </div>

                      <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                              <div className={"flex gap-1 justify-between items-center"}>
                                  Log in
                                  <ChevronRightIcon className={"w-4 h-4"}/>
                              </div>
                          </button>
                      </div>
                  </form>

                  <p className="mt-10 text-center text-sm text-gray-500">
                  Not a member?{' '}
                      <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                          Create a new account!
                      </a>
                  </p>
              </div>
          </div>
    );
};

export default LogInPage;