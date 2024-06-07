import React, {useState} from 'react';
import {ChevronRightIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";

interface SignUpFormData {
  username: string,
  password: string,
  repeatPassword: string
}

const CreateUserPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    password: "",
    repeatPassword: ""
  })

  console.log(formData)

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState =>  {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    if(formData.password !== formData.repeatPassword) {
      console.log("password falsch")
      return
    }
    //TODO validation
    console.log("erfolg")
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

      <section className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
          <a href="#" onClick={() => navigate("/signup")}
             className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Create a new account!
          </a>
        </p>
      </section>
    </div>
  );
};

export default CreateUserPage;