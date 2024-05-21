import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import Toast from '../Toast';
import { URL } from '../../utils/URL';
import {useNavigate} from "react-router-dom"
const Login = ({setLogin, setUserTitle}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name:"",
    password:""
  })
  const [error, setError] = useState({
    open: false,
    message:""
  })

  const handleLogin =async () => {
    if(!user.name || !user.password) return;
    console.log(user);
    const res = await fetch(URL+"/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })

    if(res.status === 401) {
      setError({
        open: true,
        message:res?.body?.error || "name or password invalid"
      })
    }
    if(res.status === 200) {
      const data = await res.json();
      const token = data.token;
      localStorage.setItem("token", token);
      setLogin(true);
      setUserTitle(data?.user)
      navigate("/users/" + data?.user?._id)
    }

  };

  const closeError = () => {
    setError({
      open: false,
      message:""
    })
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <div>
        <TextField
          label="Name"
          type="name"
          fullWidth
          value={user.name}
          onChange={(e) => setUser({
            ...user,
            name: e.target.value
          })}
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={user.password}
          onChange={(e) => setUser({
            ...user,
            password: e.target.value
          })}
          margin="normal"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '1rem' }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <a href='/register'>
        <div
          style={{ marginTop: '1rem', textAlign:"center" }}
        >
          register
        </div>
        </a>
      </div>
      <Toast
      open={error.open}
      onClose={closeError}
      message={error?.message}
      severity="error"
      />
    </Container>
  );
};

export default Login;
