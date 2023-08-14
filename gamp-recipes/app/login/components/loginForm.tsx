import { UserContext } from "@/app/context/user.context";
import { useContext } from "react";


const LoginForm = () => {

const { handleInputChange, user} = useContext(UserContext)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    console.log('login!');
  };

  const content =  (
    <>
      <form onSubmit={handleSubmit}>
        <div>

         <label>Username:</label>
        <input
          type="text"
          name="username"
          value={user?.username}
          onChange={handleInputChange}
        /><br />

        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={user?.email}
          onChange={handleInputChange}
        /><br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={user?.password}
          onChange={handleInputChange}
        /><br />

        </div>

        <div>

          <button type="submit">Login</button>

        </div>

      </form>
      </>
  );

  return content
};

export default LoginForm;