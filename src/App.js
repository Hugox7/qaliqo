import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './app.css';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Page404 from './components/404';

const App = () => {

  return (
    <div className='app'>
      <Switch>
        <ProtectedRoute
          component={Home}
          exact path='/'
        />
        <PublicRoute
          path='/sign-in' 
          component={SignIn}
        />
        <PublicRoute
          path='/sign-up' 
          component={SignUp}
        />
        <PublicRoute
          path='/password-reset' 
          component={PasswordReset} 
        />
        <Route path='*' component={Page404} />
      </Switch>
    </div>
  );

}

export default App;
