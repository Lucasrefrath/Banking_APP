import React, {useState} from 'react';
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import useSignUp from "../hooks/request/useSignUp";
import {RequestSignUpRequest} from "../types/Request-Response";

const CheckSignUpStatusSearch = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<number | undefined>(undefined);
  const { getRequestId, requestId } = useSignUp();
  const [formData, setFormData] = useState<RequestSignUpRequest>({
    username: "",
    password: ""
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(id !== undefined) {
      navigate(`/checkSignUp/${id}`)
      return;
    }

    getRequestId(formData, (id: number) => navigate(`/checkSignUp/${id}`))

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {...prevState, [e.target.name]: e.target.value}
    });
  }

  console.log(formData)
  console.log(id)

  const changeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const asNumber = Number.parseInt(e.target.value);
    if(isNaN(asNumber)) {
      setId(undefined);
      return;
    }
    setId(asNumber);
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
          Check Sign Up Status
        </h2>
      </section>
      <small className={"sm:mx-auto sm:w-full sm:max-w-sm text-center mt-4 text-pretty"}>Check the status of your
        recently requested Sign-Up. Enter username and password or simply use the request id.</small>

      <section className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <section className="mt-2">
            <label>Request ID</label>
            <input
              name="requestId"
              type={"text"}
              value={id}
              onChange={(e) => changeId(e)}
              placeholder="enter request id"
            />
          </section>

          <section className="relative flex items-center">
            <small className="flex-grow border-t border-gray-700"></small>
            <small className="flex-shrink mx-4">or</small>
            <small className="flex-grow border-t border-gray-700"></small>
          </section>

          <section className="mt-2">
            <label>Username</label>
            <input
              name="username"
              type={"text"}
              value={formData.username}
              disabled={id !== undefined}
              onChange={(e) => handleChange(e)}
              placeholder="enter username"
            />
          </section>
          <section className="mt-2">
            <label>Password</label>
            <input
              name="password"
              type={"password"}
              value={formData.password}
              disabled={id !== undefined}
              onChange={(e) => handleChange(e)}
              placeholder="enter password"
            />
          </section>
          <div>
            <button
              type="submit"
              className={"w-full type-primary"}
            >
              <div className={"flex gap-1 justify-between items-center"}>
                Check Status
                <ChevronRightIcon className={"icon-small"}/>
              </div>
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a Member?{' '}
          <a href="#" onClick={() => navigate("/signup")}
             className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Log In!
          </a>
        </p>
      </section>
    </div>
  );
};

export default CheckSignUpStatusSearch;