import React from 'react'
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { Link } from 'react-router-dom';

function SignOut({className, to, children}) {
  const signOut = useSignOut();
  return (
    <>
      <Link to={to} onClick={() => signOut()} className={className}>{children}</Link>
    </>
  )
}

export default SignOut
