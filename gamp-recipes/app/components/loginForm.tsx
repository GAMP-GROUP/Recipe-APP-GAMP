import { UserContext } from "@/contextAPI/context";
import { useContext } from "react";
import { useState } from "react";
import { validateEmail, validateLogin, validatePassword, validateUsername } from "@/app/lib/input.validations";
import Image from "next/image";


export default function  LoginForm (){

const [buttonClicked, setButtonClicked] = useState(false)

const { handleInputChange, user, handleLoginCardDisplay} = useContext(UserContext)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log('login!');
  };

  const handLoginBtm = () => {
    setButtonClicked(true);
    if(user.email && user.password && user.username) {
    const validation = validateLogin(user.email, user.password, user.username)
    console.log(validation);
    if (validation) {
      handleLoginCardDisplay()
  }
    }
}

  const content = (
    
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col bg-white shadow-lg px-4 pb-8 sm:px-4 md:px-10 lg:px-10 py-8 rounded-lg w-11/12 max-w-md">
        <div className="  sm:mx-auto sm:w-full sm:max-w-sm">
          <Image  
          className= 'mx-auto h-20 w-'
          src='/images/logo-color.png'
          alt="logo marca"
          height={100}
          width={120} 
              />
          <h2 className="tracking-wide  uppercase text-center text-2xm font-bold leading-9  text-gray-900">
            Sign Up
          </h2>
        </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white text-slate-950  flex-row items-center justify-between p-5 " >

         <label 
         className="block text-sm font-bold mb-2"
         htmlFor="username" 
         >Username:</label>

        <input
          type="text"
          name='username'
          value={user?.username}
          onChange={handleInputChange}
          placeholder="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
           {buttonClicked  && !validateUsername( user.username ) && (
          <p className="text-rose-500 text-xs italic">Your username must be at least 4 characters long</p>
        )}
        <br />

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-1">Email:</label>
          <input
            type="email"
            name="email"
            value={user?.email}
            onChange={handleInputChange}
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            placeholder="name@flowbite.com"
          />
             {buttonClicked  && !validateEmail( user.email ) && (
          <p className="text-rose-500 text-xs italic">Your email must be in this format: example@example.com.</p>
        )}
        <br />

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-1">Password:</label>
        <input
          type="password"
          name="password"
          value={user?.password}
          onChange={handleInputChange}
          placeholder="******"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
        />
           {buttonClicked  && !validatePassword( user.password ) && (
          <p className="text-rose-500 text-xs italic">Your password must be 6 characters long.</p>
        )}
        <br />
          <div className="flex flex-row items-center justify-between py-3 ">

          <button
          type="submit"
          onClick={() =>  handleLoginCardDisplay()}
          className="bg-red hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
            Cancel
            </button>
          <button
          type="submit"
          onClick={() => handLoginBtm()}
          className="bg-yellow hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
            Login
            </button>
            </div>
        </div>

      </form>

      </div>
      
  );

  return content
};

