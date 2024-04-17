import React, { useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Signup() {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const isEmpty = str => !str || !str.trim();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    console.log(first_name, last_name, email, phone_number,password,confirmPassword);
    if(isEmpty(first_name) || isEmpty(last_name) || isEmpty(email) || isEmpty(phone_number) || isEmpty(password) || isEmpty(confirmPassword)){
      setShowError(true);
      setErrorMessage('All fields are required. Please fill in all the fields.')
      return;
    }
    if(password !== confirmPassword){
      setShowError(true);
      setErrorMessage('Passwords do not match. Please make sure your passwords match.');
      return;
    }

    setIsSigningIn(true);
    //http://localhost:5000/api/signup
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { email, first_name, last_name, phone_number, password });
      console.log('Login successful:', response.data);
  
      // TODO: add error message
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Loging failed');
      } else {
        setErrorMessage('Network error. Please try again later');
      }
    }
    finally{
      setIsSigningIn(false);
    }
    
  };

  const dismissError = () => {
    setShowError(false);
  }

  return (
    <form onSubmit={handleSubmit} className='flex-col h-screen text-sm bg-[#161b22] text-[#f0f6fc] overflow-hidden'>
      <div className='flex justify-center pt-4 pb-6'>
        <Link to='/'>
          <AiFillGithub size={58} />
        </Link>
      </div>
      <main className=' flex justify-center'>
        <div className='flex-col justify-center mt-2 m-6 px-4 max-w-xs'>
          <h1 className=' text-center text-2xl'>
            Welcome to AlphManBarbarShop
          </h1>
          <div name='Input logger' className={`${!showError ? 'hidden' : 'flex'} justify-between border border-red-600 rounded-md m-0 mb-2 p-4 mt-4 bg-red-500 bg-opacity-10`}>
            {errorMessage}
            <button type='button' className=' flex items-center' onClick={dismissError}>
              <ion-icon name='close' />
            </button>
          </div>
          <div id="container" className=' mt-4 p-4 rounded-md border border-gray-700'>
            {/* firstName_field */}
            <label htmlFor="FirstName_field">
              First Name
            </label>
            <input required={true} type="text" name="login" id="FirstName_field" onChange={(e) => setFirstName(e.target.value)} className='bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700 focus:border-red-700' />
             {/* LastName_field */}
            <label htmlFor="lastName_field">
              last Name
            </label>
            <input required={true} type="text" name="login" id="lastName_field" onChange={(e) => setLastName(e.target.value)} className='bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700 focus:border-red-700' />
            {/*email_field */}
            <label htmlFor="email_field">
              Email address
            </label>
            <input required={true} type="email" name="login" id="email_field" onChange={(e) => setEmail(e.target.value)} className='bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700 focus:border-red-700' />
            {/* phoneNumber_field */}
            <label htmlFor="phoneNumber_field">
              Phone Number
            </label>
            <input required={true} type='tel' name="login" id="phoneNumber_field" onChange={(e) => setPhoneNumber(e.target.value)} className='bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700 focus:border-red-700' />
            {/* password_field */}
            <label htmlFor="password_field" className='flex justify-between'>
              Password
            </label>
            <input required={true} type="password" name="password" id="password_field" onChange={(e) => setPassword(e.target.value)} className=' bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700' />
            {/* confirmPassword_field */}
            <label htmlFor="password_field" className='flex justify-between'>
              Confirm Password
            </label>
            <input required={true} type="password" name="confirmPassword" id="confirmPassword_field" onChange={(e) => setConfirmPassword(e.target.value)} className=' bg-transparent w-full px-3 py-1 mt-1 mb-4 rounded-md border border-gray-700' />
            <input type="submit" id='submit' disabled={isSigningIn} value={isSigningIn ? "Signing Up..." : "Sign Up"} className={`w-full ${isSigningIn ? "bg-green-900 border border-green-900" : "bg-green-700 border border-green-700 cursor-pointer"} px-4 py-1 rounded-md mt-2 `} />
            {/* divider */}
            <div name='divider' className='mt-4 flex justify-between items-center'>
              <div className=' relative inline-block w-1/2 h-[1px] align-middle bg-[#30363d]' />
              <span className=' px-1'>Or</span>
              <div className=' relative inline-block w-1/2 h-[1px] align-middle bg-[#30363d]' />
            </div>
            {/* other sign in option */}
            <div name='other sign in' className='flex justify-evenly mt-4 text-2xl'>
              <button type='button' className=' flex items-center '>
                <ion-icon name='logo-google' />
              </button>
              <button type='button' className=' flex items-center '>
                <ion-icon name='logo-twitter' />
              </button>
              <button type='button' className=' flex items-center '>
                <ion-icon name='logo-apple' />
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
