import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import "./UserCredentialsDialog.css";

export default function UserCredentialsDialog({
  open,
  onSubmit,
  onClose,
  title,
  submitText,
  isRegistration,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName]= useState("")
  const [cred, setCred]= useState("")
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (open) {
      setUsername("");
      setPassword("");
      setLoginError("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setUsername("");
      setPassword("");
      setCompanyName("");
      setCred("");
      setLoginError("");
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <div className="dialog-container">
        <DialogTitle>{title}</DialogTitle>
        {isRegistration == true && (<div className="form-item">
          <TextField
            fullWidth
            label="Company Name"
            type="text"
            value={companyName}
            onChange={({ target: { value } }) => setCompanyName(value)}
          />
        </div>)}
        <div className="form-item">
          <TextField
            fullWidth
            label="Username"
            type="text"
            value={username}
            placeholder="example.xyz (mhe56.aub)"
            onChange={({ target: { value } }) => setUsername(value)}
          />
        </div>
        <div className="form-item">
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>
        {isRegistration == true && (<div className="form-item">
          <TextField
            fullWidth
            label="Credentials"
            type="text"
            value={cred}
            onChange={({ target: { value } }) => setCred(value)}
            placeholder="Only 3 Letters"
            maxLength={3}
          />
        </div>)}
        {loginError && (
            <p className="error-message">
                {loginError === "Blank Username or Password" ? "Blank Username or Password" :
                    loginError === "Invalid Login Combination" ? "Invalid Login Combination" :
                    loginError === "Database Error" ? "Database Error" : "Login failed. Please try again."
                }
            </p>
        )}
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            if (isRegistration==true){
              onSubmit(companyName, username, password, cred)
              .catch((error) => setLoginError(error.message));}
            else {
              onSubmit(username, password)
              .catch((error) => setLoginError(error.message));}
          }}
        >
          {submitText}
        </Button>
      </div>
    </Dialog>
  );
}
