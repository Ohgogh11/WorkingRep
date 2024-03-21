import React, {useState} from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function Signup() {
    const [isSigningIn, setIsSigningIn] = useState(false);

    const sendForm = () => {};

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
            Welcome to AlphManBarbarShop
          </h1>
          {/* <div name='Input logger' className={`${!isShow ? 'hidden' : 'flex'} justify-between border border-red-600 rounded-md m-0 mb-2 p-4 mt-4 bg-red-500 bg-opacity-10`}>
            Incorrect username or password.
            <button type='button' className=' flex items-center' onClick={toggleShow}>
              <ion-icon name='close' />
            </button>
          </div> */}
          <div id="container" className=' mt-4 p-4 rounded-md border border-gray-700'>
            {/* UserName_field */}
            <label htmlFor="userName_field">
              Full Name
            </label>
            <input type="text" name="login" id="userName_field" className='bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700 focus:border-red-700' />
            {/*email_field */}
            <label htmlFor="email_field">
                email address
            </label>
            <input type="text" name="login" id="email_field" className='bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700 focus:border-red-700' />
            {/* phoneNumber_field */}
            <label htmlFor="phoneNumber_field">
              Phone Number
            </label>
            <input type='tel' name="login" id="phoneNumber_field" className='bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700 focus:border-red-700' />
            {/* password_field */}
            <label htmlFor="password_field" className='flex justify-between'>
              Password
            </label>
            <input type="password" name="password" id="password_field" className=' bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700' />
            {/* confirmPassword_field */}
            <label htmlFor="password_field" className='flex justify-between'>
              Confirm Password
            </label>
            <input type="password" name="confirmPassword" id="confirmPassword_field" className=' bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700' />
            <input type="submit" id='submit' disabled={isSigningIn} onClick={sendForm} value={ isSigningIn ? "Signing in..." : "Sign In"} className={`w-full ${isSigningIn ? "bg-green-900 border border-green-900":"bg-green-700 border border-green-700 cursor-pointer"} px-4 py-1 rounded-md mt-2 `} />
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
              Already have an Account?
              <Link to='/Login' className=' pl-1 text-[#2f81f7]'>LogIn Now</Link>
            </p>
          </div>
        </div>
      </main>
    </form>
  )
}

export default Signup
