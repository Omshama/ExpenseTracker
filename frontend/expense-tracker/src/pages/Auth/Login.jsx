import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Fixed import for Link
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input'; // import your custom Input component
import { validateEmail ,validatePassword} from '../../utilis/helper';
import axiosInstance from '../../utilis/axiosInstance';
import { API_PATHS } from '../../utilis/apiPaths';
import { UserContext } from '../../context/userContext';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const {updateUser}=useContext(UserContext);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

  if(!validateEmail(email)){
    setError("Please enter a valid email address");
    return;
  }
  if(!validatePassword(password)){
    setError("Your Entered Password is not Valid");
    return;
  }
  //Login API Call
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
      email,
      password,
    });
    const {token, user }=response.data;

    if(token){
      localStorage.setItem("token",token);
      updateUser(user);
      navigate("/dashboard");
    }
    

  }
  catch(error)
  {
    if(error.response &&  error.response.data.message){
      setError(error.response.data.message); 
    }
    else{
      setError("Something went wrong.Please Try Again")
    }
  }

  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1 mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="Enter your email address"
            type="text"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="btn-primary"
          >
            Log In
          </button>

          <p className="text-[13px] text-slate-800 mt-3 text-center">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
