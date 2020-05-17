import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../providers/userProvider';
import Loading from './Loading';

const PublicRoute = ({ component: Component, ...rest }) => {
    

    return (
        <UserContext.Consumer>
            {context => {
                if (context.loading) {
                    return <Loading />
                } else if (!context.authenticated) {
                    return (<Route {...rest} render={props => {
                        return <Component context={context} {...props} />
                    }} />)
                } else {
                    return <Redirect to='/' />
                }
            }}
        </UserContext.Consumer>
    );
}

export default PublicRoute;