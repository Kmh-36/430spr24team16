import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { getUserToken, clearUserToken, getUserType, clearUserType, getUserToken2, clearUserToken2, saveUserToken, saveUserToken2, saveUserType, getUserToken3, setUserToken3, clearUserToken3, saveUserToken3 } from './localStorage';
import Home from './component/Home';
import Owner from './component/Owner/Owner';
import Employee from './component/Employee/Employee';
import Employer from './component/Employer/Employer';
import Contributor from './component/Contributor/Contributor';

function App({ location }) {
  const [userToken, setUserToken] = useState(getUserToken());
  const [userToken2, setUserToken2] = useState(getUserToken2());
  const [userToken3, setUserToken3] = useState(getUserToken3());
  const [userType, setUserType] = useState(getUserType());
  console.log("userToken: ",userToken)
  console.log("userToken2: ",userToken2)
  console.log("userToken3: ",userToken3)
  console.log("userType: ",userType)
  useEffect(() => {
    setUserToken(getUserToken());
    setUserToken2(getUserToken2());
    setUserToken3(getUserToken3());
    setUserType(getUserType());
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  /*useEffect(() => {
    if (userToken) {
      saveUserToken(userToken);
    } else {
      clearUserToken();
    }
  }, [userToken]);

  useEffect(() => {
    if (userType !== null) {
      saveUserType(userType);
    } else {
      clearUserType();
    }
  }, [userType]);

  useEffect(() => {
    if (userToken2) {
      saveUserToken2(userToken2);
    } else {
      clearUserToken2();
    }
  }, [userToken2]);*/

  useEffect(() => {
    const path = location.pathname;
    if (path === '/'&&!userToken&&!userToken2) {
      setUserToken(null);
      setUserToken2(null);
      setUserToken3(null);
      setUserType(null);
    } else if (path === '/owner'&&userToken2) {
      setUserToken2(getUserToken2());
    } else if (path === '/employer'&&userToken&&userType) {
      setUserToken(getUserToken());
      setUserType(true);
    } else if (path === '/employee'&&userToken&&!userType) {
      setUserToken(getUserToken());
      setUserType(false);
    } else if (path === '/contributor'&&userToken3) {
      setUserToken(getUserToken3());
      setUserType(false);
    }
    else{
      setUserToken(null);
      setUserToken2(null);
      setUserToken3(null);
      setUserType(null);
    }
  }, [location.pathname]);

  function logout() {
    clearUserToken();
    clearUserToken2();
    clearUserToken3();
    clearUserType();
    setUserToken(null);
    setUserToken2(null);
    setUserToken3(null);
    setUserType(null);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          !userToken && !userToken2 && !userToken3? (
            <Home
              userToken={userToken}
              userToken2={userToken2}
              userToken3={userToken3}
              userType={userType}
              setUserToken={setUserToken}
              setUserToken2={setUserToken2}
              setUserToken3={setUserToken3}
              setUserType={setUserType}
              saveUserToken={saveUserToken}
              saveUserToken2={saveUserToken2}
              saveUserToken3={saveUserToken3}
              saveUserType={saveUserType}
            />
          ) : userToken2 ? (
            <Owner userToken2={userToken2} logout={logout} />
          ) : userToken && userType === true ? (
            <Employer userToken={userToken} logout={logout} />
          ) : userToken && userType === false ? (
            <Employee userToken={userToken} logout={logout} />
          ) : userToken3 ? (
            <Contributor userToken3={userToken3} logout={logout} />
          ) : (
            <Navigate to="/" />
          )
        } />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  const location = useLocation();
  return <App location={location} />;
}

export default function AppWithRouter() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
