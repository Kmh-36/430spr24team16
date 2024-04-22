import React, { useState, useEffect, useCallback } from 'react';
import './Home.css';
import UserCredentialsDialog from './UserCredentialsDialog/UserCredentialsDialog';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


function Home({userToken, userToken2, userToken3, userType, setUserToken, setUserToken2, setUserToken3, setUserType, saveUserToken, saveUserToken2, saveUserToken3, saveUserType}) {
    const SERVER_URL = "http://127.0.0.1:5000";
    const States = {
        PENDING: "PENDING",
        COMPANY_CREATION: "COMPANY_CREATION",
        COMPANY_LOGIN: "COMPANY_LOGIN",
        EMPLOYEE_LOGIN: "EMPLOYEE_LOGIN",
        CONTRIBUTOR_LOGIN: "CONTRIBUTOR_LOGIN",
        CONTRIBUTOR_REGISTER: "CONTRIBUTOR_REGISTER",
        AUTHENTICATED: "AUTHENTICATED",
    };
    let [authState, setAuthState] = useState(States.PENDING);
  
    function loginEmployee(username, password) {
        console.log (username, password)
      return fetch(`${SERVER_URL}/loginEmployee `, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
              user_name: username,
              password: password,
          }),
      })
      .then((response) => {
          if (!response.ok) {
              if (response.status === 400) {
                  throw new Error("Blank Username or Password");
              } else if (response.status === 403) {
                  throw new Error("Invalid Login Combination");
              } else if (response.status === 500) {
                  throw new Error("Invalid Login Attempt");
              } else {
                  throw new Error(`Failed to authenticate: ${response.statusText}`);
              }
          }
          return response.json();
      })
      .then((body) => {
          console.log(body.token)
          saveUserToken(body.token);
          setUserToken(body.token);
          saveUserType(body.is_employer)
          setUserType(body.is_employer);
          setAuthState(States.AUTHENTICATED);
          
      })
      .catch((error) => {
          console.error("Error during login:", error.message);
          throw error;
      });
    }
  
  function loginOwner(email, password) {
    return fetch(`${SERVER_URL}/loginOwner`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
    .then((response) => {
        if (!response.ok) {
            if (response.status === 400) {
                throw new Error("Blank Username or Password");
            } else if (response.status === 403) {
                throw new Error("Invalid Login Combination");
            } else if (response.status === 500) {
                throw new Error("Invalid Login Attempt");
            } else {
                throw new Error(`Failed to authenticate: ${response.statusText}`);
            }
        }
        return response.json();
    })
    .then((body) => {
        saveUserToken2(body.token);
        setUserToken2(body.token);
        setAuthState(States.AUTHENTICATED);
        console.log(body.token)
    })
    .catch((error) => {
        console.error("Error during login:", error.message);
        throw error;
        });
    }
  
  
    function Register(companyName, email, password, credentials) {
        return fetch(`${SERVER_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                companyName: companyName,
                email: email,
                password: password,
                credentials: credentials,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            return response.json();
        })
        .then(body => loginOwner(email, password)) 
        .catch(error => {
            console.error('Error creating user:', error);
        });
    }

    function loginContributor(username, password) {
        return fetch(`${SERVER_URL}/login_Contributor`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_name: username,
                password: password,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error("Blank Username or Password");
                } else if (response.status === 403) {
                    throw new Error("Invalid Login Combination");
                } else if (response.status === 500) {
                    throw new Error("Invalid Login Attempt");
                } else {
                    throw new Error(`Failed to authenticate: ${response.statusText}`);
                }
            }
            return response.json();
        })
        .then((body) => {
            saveUserToken3(body.token);
            setUserToken3(body.token);
            setAuthState(States.AUTHENTICATED);
            console.log(body.token)
        })
        .catch((error) => {
            console.error("Error during login:", error.message);
            throw error;
            });
    }
    
    function registerContributor(username, password) {
        return fetch(`${SERVER_URL}/Register_Contributor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_name: username,
                password: password,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            return response.json();
        })
        .then(body => loginContributor(username, password)) 
        .catch(error => {
            console.error('Error creating user:', error);
        });
    }
    

    return (
        <div className="home-container">
            <header className="header">
            <div>
                <h1>Welcome to Your Company Portal</h1>
            </div>
            <div>
                <p>Login or Register to get started</p>
            </div>
            </header>

            <div className="main-content">
            <Snackbar
                elevation={6}
                variant="filled"
                open={authState === States.AUTHENTICATED}
                autoHideDuration={2000}
                onClose={() => setAuthState(States.PENDING)}
            >
                <Alert severity="success">Authentication Successful!</Alert>
            </Snackbar>
            <UserCredentialsDialog
                open={authState === States.COMPANY_CREATION}
                onSubmit={Register}
                onClose={() => setAuthState(States.PENDING)}
                title="Register A Company"
                submitText="Register"
                isRegistration={true}
            />
            <UserCredentialsDialog
                open={authState === States.COMPANY_LOGIN}
                onSubmit={loginOwner}
                onClose={() => setAuthState(States.PENDING)}
                title="Login"
                submitText="Login"
                isRegistration={false}
            />
            <UserCredentialsDialog
                open={authState === States.EMPLOYEE_LOGIN}
                onSubmit={loginEmployee}
                onClose={() => setAuthState(States.PENDING)}
                title="Login"
                submitText="Login"
                isRegistration={false}
            />
            <UserCredentialsDialog
                open={authState === States.CONTRIBUTOR_REGISTER}
                onSubmit={registerContributor}
                onClose={() => setAuthState(States.PENDING)}
                title="Register as Contributer"
                submitText="Register"
                isRegistration={false}
            />
            <UserCredentialsDialog
                open={authState === States.CONTRIBUTOR_LOGIN}
                onSubmit={loginContributor}
                onClose={() => setAuthState(States.PENDING)}
                title="Login as Contributer"
                submitText="Login"
                isRegistration={false}
            />
    
            <div className="role-buttons">
                <button onClick={() => setAuthState(States.COMPANY_LOGIN)} className="login-button">Owner Login</button>
                <button onClick={() => setAuthState(States.EMPLOYEE_LOGIN)} className="login-button">Employee Login</button>
                <button onClick={() => setAuthState(States.COMPANY_CREATION)} className="login-button">Start a Company</button>
            </div>
            <hr className="separator" />
            <div className="role-buttons">
                <button onClick={() => setAuthState(States.CONTRIBUTOR_REGISTER)} className="login-button">Register Contributor</button>
                <button onClick={() => setAuthState(States.CONTRIBUTOR_LOGIN)} className="login-button">Contributor Login</button>
            </div>
            <footer className="footer">
                <p>&copy; 2024 SKM. All rights reserved.</p>
            </footer>
        </div>
        </div>
    );    
};

export default Home;
