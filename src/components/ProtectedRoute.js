import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../providers/userProvider';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    

    return (

        <UserContext.Consumer>
            {context => {
                if (context.loading) {
                    return <div>LOADING...</div>
                } else if (context.authenticated) {
                    return (<Route {...rest} render={props => {
                        return <Component context={context} {...props} />
                    }} />)
                } else {
                    return <Redirect to='/sign-in' />
                }
            }}
        </UserContext.Consumer>
    );
}

export default ProtectedRoute;