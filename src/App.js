import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import './app.css';
import { UserContext } from './providers/userProvider';
import { auth } from './config/firebase';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';

const App = () => {

  const user = useContext(UserContext);

  const disconnect = (e) => {
    e.preventDefault();
    auth.signOut();
  }

  if (user) {
    return (
      <div className='app'>
        <p>hello</p>
        <Button color='primary' variant='contained' onClick={disconnect}>Deconnection</Button>
      </div>
    );
  } else {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/password-reset' component={PasswordReset} />
        </Switch>
      </div>
    );
  }

}

export default App;
