import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './components/SignUpLogInComponents/SignIn';
import SignUp from './components/SignUpLogInComponents/SignUp';
import HomePage from './components/HomeScreen/HomePage';
import NavBar from './components/NavBar';
import AuthContext from './auth';
import AuthRoute from './components/AuthRoute';
import SinglePlace from './components/SinglePlace';
import SiteContext from './site';

function App() {

  const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);


  const authContextValue = {
    fetchWithCSRF,
    currentUserId,
    setCurrentUserId
  };




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
        if (authData.current_user_id) {
          console.log(authData)
          setCurrentUserId(authData.current_user_id)
        }
      }
      setLoading(false)
    }
    restoreCSRF();
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading && <div>Loading...</div>}
      {!loading &&
        <BrowserRouter>
          <NavBar currentUserId={currentUserId} />
          <Switch>
            <Route exact path='/' component={HomePage} currentUserId={currentUserId} />
            <AuthRoute exact path='/signin' component={SignIn} currentUserId={currentUserId} />
            <AuthRoute exact path='/sign-up' component={SignUp} currentUserId={currentUserId} />
            <Route path='/:id' component={SinglePlace} currentUserId={currentUserId} />
          </Switch>
          {/* <Footer /> */}
        </BrowserRouter>
      }
    </AuthContext.Provider>
  );
}

export default App;