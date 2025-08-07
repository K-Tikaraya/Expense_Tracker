import React, { useContext,useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/inputs/Input'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPath'
import { UserContext } from '../../context/userContext'


const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const[error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

   const navigate = useNavigate();

  // handle login form submit

  const handlelogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }
    if(!password){
      setError("Please enter a valid password.");
      return;
    }
    setError("");

    //Login API Call

    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });

      const {token, user} = response.data;
      if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    }catch(error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("Something went wrong, Please try again");
      }
    }

  }
  return (
    <AuthLayout>
    <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Please enter your details to log in
      </p>

      <form onSubmit={handlelogin}>
        <Input 
         value = {email}
         onChange = {({target}) => setEmail( target.value)}
         label="Email Address"
         placeholder = "john@example.com"
         type="text"
         />

          <Input 
         value = {password}
         onChange = {({target}) => setPassword(target.value)}
         label="Password"
         placeholder = "Min 8 characters"
         type="password"
         />

         {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
         <button type="submit" className='btn-primary'>
          Log In
         </button>

        <p className='text=[13px] text-slate-800 mt-3'>
          Don't have an account?{""}
          <Link className="font-medium text-primary underline" to="/signup">
          SignUp
          </Link>
        </p>
      </form>
    </div>
    </AuthLayout>
  );
};

export default Login
