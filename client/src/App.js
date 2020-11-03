import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/signin'>
          <SignIn />
        </Route>
        <Route exact path='/sign-up'>
          <SignUp />
        </Route>
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;