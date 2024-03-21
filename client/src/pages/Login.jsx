import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai';

function Login() {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const toggleShow = () => {
    setIsShow(!isShow); 
  };

  const sendForm = async () => {
    const usernameOrEmail = document.getElementById('login_field').value;
    const password = document.getElementById('password_field').value;
    setIsSigningIn(true);
    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usernameOrEmail, password })
      });
  
      if (!response.ok) {
        setIsShow(true);
      }
  
      const data = await response.json();
      
      if (response.status === 200) {
        // Sign in successful
        navigate(`/:${data.user.user_id}`);
      } else {
        // Authentication failed
        throw new Error(data.error);
      }
    } catch (error) {
      throw error;
    }
    finally{
      setIsSigningIn(false);
    }
  };

  return (
    <form action="" className='flex-col h-screen text-sm bg-[#161b22] text-[#f0f6fc]'>
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
          <div name='Input logger' className={`${!isShow ? 'hidden' : 'flex'} justify-between border border-red-600 rounded-md m-0 mb-2 p-4 mt-4 bg-red-500 bg-opacity-10`}>
            Incorrect username or password.
            <button type='button' className=' flex items-center' onClick={toggleShow}>
              <ion-icon name='close' />
            </button>
          </div>
          <div id="container" className=' mt-4 p-4 rounded-md border border-gray-700'>
            {/* UserName_field */}
            <label htmlFor="login_field">
              UserName or email address
            </label>
            <input type="text" name="login" id="login_field" className='bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700 focus:border-red-700' />
            {/* password_field */}
            <label htmlFor="password_field" className='flex justify-between'>
              Password
              <Link to='/password_reset' className=' text-xs text-[#2f81f7]'>Forgot password?</Link>
            </label>
            <input type="password" name="password" id="password_field" className=' bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700' />
            <input type="button" id='submit' disabled={isSigningIn} onClick={sendForm} value={ isSigningIn ? "Signing in..." : "Sign In"} className={`w-full ${isSigningIn ? "bg-green-900 border border-green-900":"bg-green-700 border border-green-700 cursor-pointer"} px-4 py-1 rounded-md mt-2 `} />
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
