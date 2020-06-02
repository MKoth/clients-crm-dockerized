import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LoginRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !localStorage.getItem('key')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
    )} />
)
  
export default LoginRoute;