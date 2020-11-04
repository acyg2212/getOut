import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import SignIn from './components/SignUpLogInComponents/SignIn';
import SignUp from './components/SignUpLogInComponents/SignUp';
import HomePage from './components/HomeScreen/HomePage';
import NavBar from './components/NavBar';
import AuthContext from './auth';

function App() {

  const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const authContextValue = {
    fetchWithCSRF,
    currentUserId,
    setCurrentUserId
  };

  const logoutUser = async () => {
    const response = await fetchWithCSRF('/logout', {
      method: 'POST',
      credentials: 'include'
    });
    if (response.ok) {
      setCurrentUserId(null)
    }
  }

  useEffect(() => {
    async function restoreCSRF() {
      const response = await fetch('/api/csrf/restore', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const authData = await response.json();
        setFetchWithCSRF(() => {
          return (resource, init) => {
            if (init.headers) {
              init.headers['X-CSRFToken'] = authData.csrf_token;
            } else {
              init.headers = {
                'X-CSRFToken': authData.csrf_token
              }
            }
            return fetch(resource, init);
          }
        });
      }
    }
    restoreCSRF();
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      { loading && <div>Loading...</div>}
      {!loading &&
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/signin'>
              <SignIn />
            </Route>
            <Route exact path='/sign-up'>
              <SignUp />
            </Route>
          </Switch>
          {/* <Footer /> */}
        </BrowserRouter>
      }
    </AuthContext.Provider>
  );
}

export default App;