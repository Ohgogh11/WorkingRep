import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import React from 'react';

function IsSignedIn({ logged, notLogged }) {
    const isAuthenticated = useIsAuthenticated();
    console.log(isAuthenticated);
    return (
            isAuthenticated === true ? logged : notLogged
    );
}

export default IsSignedIn
