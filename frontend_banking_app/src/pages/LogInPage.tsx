import React, {useState} from 'react';
import useAuthContext from "../hooks/contextHook/useAuthContext";
import {Navigate, useNavigate} from "react-router-dom";
import {DEFAULT_USER} from "../const/GlobalConst";
import {ChevronRightIcon} from "@heroicons/react/24/outline";

const LogInPage = () => {
    const { login, isAuthenticated} = useAuthContext();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>(DEFAULT_USER.username)
    const [password, setPassword] = useState<string>(DEFAULT_USER.password)

    const handleLogIn = (e: React.FormEvent) => {
        e.preventDefault();
        login({
            username,
            password
        });
        navigate("/dashboard");
    }

    return (
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <section className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                  <h2 className="mt-10 text-center">
                      Sign in to your account
                  </h2>
              </section>

              <section className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6" onSubmit={(e) => handleLogIn(e)}>
                      <div>
                          <div className="mt-2">
                              <label>Username</label>
                              <input
                                name="email"
                                id="email"
                                type={"text"}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="enter username"
                              />
                          </div>
                      </div>

                      <div>
                          <div className="mt-2">
                              <div className="flex items-center justify-between">
                                  <label>Password</label>
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
                                placeholder="enter password"
                              />
                          </div>
                      </div>

                      <div>
                          <button
                            type="submit"
                            className={"w-full type-primary"}
                          >
                              <div className={"flex gap-1 justify-between items-center"}>
                                  Log in
                                  <ChevronRightIcon className={"icon-small"}/>
                              </div>
                          </button>
                      </div>
                  </form>

                  <p className="mt-10 text-center text-sm text-gray-500">
                  Not a member?{' '}
                      <a href="#" onClick={() => navigate("/signup")} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                          Create a new account!
                      </a>
                  </p>
              </section>
          </div>
    );
};

export default LogInPage;