import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, user, company, error, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('key')
            ? <>{user&&company&&user.id&&company.id&&<Component {...props} />}</>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

const mapStateToProps = state => ({
    user: state.user.user,
    error: state.user.error,
    company: state.company.company
  });
  
  //const mapDispatchToProps = dispatch => ({});
  
  export default connect(mapStateToProps)(PrivateRoute);