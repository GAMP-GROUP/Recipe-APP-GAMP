import { UserContext } from "@/contextAPI/context";
import { useContext } from "react";


const LoginForm = () => {

const { handleInputChange, user} = useContext(UserContext)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    console.log('login!');
  };

  const handLoginBtm = () =>{
    
  }

  const content =  (
    <>
      <form onSubmit={handleSubmit}  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="bg-white text-slate-950  flex-row items-center justify-between p-5 " >

         <label 
         className="block text-gray-700 text-sm font-bold mb-2"
         htmlFor="username" 
         >Username:</label>

        <input
          type="text"
          name="username"
          value={user?.username}
          onChange={handleInputChange}
          placeholder="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        /><br />

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
        <br />

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-1">Password:</label>
        <input
          type="password"
          name="password"
          value={user?.password}
          onChange={handleInputChange}
          placeholder="******"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        {user.password === '' && (
          <p className="text-red-500 text-xs italic">Please choose a password.</p>
        )}
        <br />


          <button 
          type="submit"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
            Login</button>


        </div>

      </form>
      </>
  );

  return content
};

export default LoginForm;