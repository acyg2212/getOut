import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './components/SignUpLogInComponents/SignIn';
import SignUp from './components/SignUpLogInComponents/SignUp';
import HomePage from './components/HomeScreen/HomePage';
import NavBar from './components/NavBar';
import AuthContext from './auth';

function App() {

  const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
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
      { loading && <div>Loading...</div>}
      {!loading &&
        <BrowserRouter>
          <NavBar currentUserId={currentUserId} />
          <Switch>
            <Route exact path='/' component={HomePage} currentUserId={currentUserId} />
            <Route exact path='/signin' component={SignIn} currentUserId={currentUserId} />
            <Route exact path='/sign-up' component={SignUp} currentUserId={currentUserId} />
          </Switch>
          {/* <Footer /> */}
        </BrowserRouter>
      }
    </AuthContext.Provider>
  );
}

export default App;