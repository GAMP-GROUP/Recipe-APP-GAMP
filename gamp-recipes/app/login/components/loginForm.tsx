import { UserContext } from "@/app/context/user.context";
import { useContext } from "react";


const LoginForm = () => {

const { login} = useContext(UserContext)


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    console.log('login!');
  };

  const content =  (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            // value={username}
            // onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            // value={password}
            // onChange={handlePasswordChange}
            required
          />
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