import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './app.css';

import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import PasswordReset from './components/PasswordReset';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
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
      </Switch>
    </div>
  );

}

export default App;
