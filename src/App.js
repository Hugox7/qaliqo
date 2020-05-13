import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import './app.css';
import { UserContext } from './providers/userProvider';
import SignIn from './components/SignIn';

const App = () => {

  const user = useContext(UserContext);

  return (
    <div className="app">
      <Switch>
        <Route exact path='/' component={SignIn} />
      </Switch>
    </div>
  );
}

export default App;
