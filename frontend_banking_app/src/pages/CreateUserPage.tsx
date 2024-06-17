import React, {useEffect, useState} from 'react';
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import useSignUp from "../hooks/request/useSignUp";
import SignUpCompletePopUp from "../components/pop-ups/SignUpCompletePopUp";
import useValidate from "../hooks/useValidate";
import {ServerException} from "../types/Types";
import ServerErrorPopUp from "../components/pop-ups/ServerErrorPopUp";
import ValidationError from "../components/customUI/ValidationError";

interface SignUpFormData {
  username: string,
  password: string,
  repeatPassword: string
}

const CreateUserPage = () => {
  const navigate = useNavigate();
  const { handleRequest, isPending, requestResponse} = useSignUp();
  const [validationError, setValidationError] = useState("");
  const [serverError, setServerError] = useState<ServerException | undefined>(undefined)
  const { stringIsEmpty } = useValidate();
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    password: "",
    repeatPassword: ""
  })

  useEffect(() => {
    setValidationError("")
  }, [ formData ]);

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState =>  {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if(stringIsEmpty(formData.username) || stringIsEmpty(formData.password)) {
      setValidationError("Username and password are required.")
      return;
    }

    if(formData.password !== formData.repeatPassword) {
      setValidationError("Please repeat your password to confirm.")
      return
    }

    handleRequest({
      username: formData.username,
      password: formData.password
    }, () => console.log(""),
      (error) => setServerError(error)
      )
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
          Sign Up for new Account
        </h2>
      </section>
      <small className={"sm:mx-auto sm:w-full sm:max-w-sm text-center mt-4 text-pretty"}>Sign up for up to 10 Saving accounts. After Signup your Request will be processed by a Admin.</small>

      <section className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <section>
          <ValidationError error={validationError} clearError={() => setValidationError("")} />
        </section>
        <form className="space-y-6" onSubmit={(e) => handleSignUp(e)}>
          <section className="mt-2">
            <label>Username</label>
            <input
              name="username"
              type={"text"}
              value={formData.username}
              onChange={e => updateFormData(e)}
              placeholder="enter username"
            />
          </section>
          <section className="mt-2">
            <label>Password</label>
            <input
              name="password"
              type={"password"}
              value={formData.password}
              onChange={e => updateFormData(e)}
              placeholder="enter password"
            />
          </section>
          <section className="mt-2">
            <label>Repeat Password</label>
            <input
              name="repeatPassword"
              type={"password"}
              value={formData.repeatPassword}
              onChange={e => updateFormData(e)}
              placeholder="repeat your password"
            />
          </section>

          <div>
            <button
              type="submit"
              className={"w-full type-primary"}
              disabled={isPending}
            >
              <div className={"flex gap-1 justify-between items-center"}>
                Sign Up Now
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
      <SignUpCompletePopUp requestResponse={requestResponse} />
      <ServerErrorPopUp error={serverError} clearError={() => setServerError(undefined)} />
    </div>
  );
};

export default CreateUserPage;