import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai';
import axios from 'axios'; // For making HTTP requests


function Login() {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [password, setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit  = async (event) => {
    event.preventDefault();

    if (!email || !password){
      setErrorMessage('Unfilled Email or Password field');
      setShowError(true);
      return;
    }
    console.log(email, password);
    
    setIsSigningIn(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      console.log('Login successful:', response.data);
  
      // TODO: add error message
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Login failed');
      } else {
        setErrorMessage('Network error');
      }
    }
    finally{
      setIsSigningIn(false);
    }
  };

  const dismissError = () =>{
    setShowError(false);
  }
  
  return (
    <form onSubmit={handleSubmit} className='flex-col h-screen text-sm bg-[#161b22] text-[#f0f6fc]'>
      <div className='flex justify-center pt-20 pb-6'>
        <Link to='/'>
          <AiFillGithub size={58} />
        </Link>
      </div>
      <main className=' flex justify-center'>
        <div className='flex-col justify-center mt-2 m-6 px-4 max-w-xs'>
          <h1 className=' text-center text-2xl'>
            Sign in to AlphManBarbarShop
          </h1>
          <div name='Input logger' className={`${!showError ? 'hidden' : 'flex'} justify-between border border-red-600 rounded-md m-0 mb-2 p-4 mt-4 bg-red-500 bg-opacity-10`}>
            {errorMessage}
            <button type='button' className=' flex items-center' onClick={dismissError}>
              <ion-icon name='close' />
            </button>
          </div>
          <div id="container" className=' mt-4 p-4 rounded-md border border-gray-700'>
            {/* UserName_field */}
            <label htmlFor="Email_field">
              Email Address
            </label>
            <input type="text" name="Email" id="Email_field" onChange={(e)=> setEmail(e.target.value)} className='bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700 focus:border-red-700' />
            {/* password_field */}
            <label htmlFor="password_field"  className='flex justify-between'>
              Password
              <Link to='/password_reset' className=' text-xs text-[#2f81f7]'>Forgot password?</Link>
            </label>
            <input type="password" name="password" id="password_field" onChange={(e)=> setPassword(e.target.value)} className=' bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700' />
            <input type="submit" id='submit' disabled={isSigningIn} value={ isSigningIn ? "Signing in..." : "Sign In"} className={`w-full ${isSigningIn ? "bg-green-900 border border-green-900":"bg-green-700 border border-green-700 cursor-pointer"} px-4 py-1 rounded-md mt-2 `} />
            {/* divider */}
            <div name='divider' className='mt-4 flex justify-between items-center'>
              <div className=' relative inline-block w-1/2 h-[1px] align-middle bg-[#30363d]'/>
              <span className=' px-1'>Or</span>
              <div className=' relative inline-block w-1/2 h-[1px] align-middle bg-[#30363d]'/>
            </div>
            {/* other sign in option */}
            <div name='other sign in' className='flex justify-evenly mt-4 text-2xl'>
              <button type='button' className=' flex items-center '>
                <ion-icon name='logo-google'/>
              </button>
              <button type='button' className=' flex items-center '>
                <ion-icon name='logo-twitter'/>
              </button>
              <button type='button' className=' flex items-center '>
                <ion-icon name='logo-apple'/>
              </button>
            </div>
          </div>
          <div name='Have an account' className='justify-center mt-4 border rounded-md border-gray-700 text-center'>
            <p className=' mt-auto mb-auto p-4'>
              New?
              <Link to='/Signup' className=' pl-1 text-[#2f81f7]'>Create an account</Link>
            </p>
          </div>
        </div>
      </main>
    </form>
  )
}

export default Login
