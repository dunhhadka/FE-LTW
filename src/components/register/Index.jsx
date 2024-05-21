import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import Toast from '../Toast';
import { useNavigate  } from 'react-router-dom';
import { URL } from '../../utils/URL';
const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name:"",
    password:"",
    first_name:"",
    last_name:"",
    location:"",
    description:"",
    occupation:""
  })

  const [error, setError] = useState({
     open: false,
     message:""
   })

  const handleLogin =async () => {
    if(!user.name || !user.password) return;
    console.log(user);
    const res = await fetch(URL+"/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    const response = await res.json();
    if(res.status !== 201) {
     setError({
          open: true,
          message:response.error || `Failed to register account.`
     })
    } else {
      navigate("/");
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
        Register
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
          label="FirstName"
          type="name"
          fullWidth
          value={user.first_name}
          onChange={(e) => setUser({
            ...user,
            first_name: e.target.value
          })}
          margin="normal"
          variant="outlined"
        />
         <TextField
          label="LastName"
          type="name"
          fullWidth
          value={user.last_name}
          onChange={(e) => setUser({
            ...user,
            last_name: e.target.value
          })}
          margin="normal"
          variant="outlined"
        />
                 <TextField
          label="Location"
          type="text"
          fullWidth
          value={user.last_name}
          onChange={(e) => setUser({
            ...user,
            location: e.target.value
          })}
          margin="normal"
          variant="outlined"
        />
                 <TextField
          label="Description"
          type="name"
          fullWidth
          value={user.last_name}
          onChange={(e) => setUser({
            ...user,
            description: e.target.value
          })}
          margin="normal"
          variant="outlined"
        />
          <TextField
          label="Occupation"
          type="name"
          fullWidth
          value={user.last_name}
          onChange={(e) => setUser({
            ...user,
            occupation: e.target.value
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
          Register
        </Button>
        <a href='/'>
        <div
          style={{ marginTop: '1rem', textAlign:"center" }}
        >
          Login
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

export default Register;
