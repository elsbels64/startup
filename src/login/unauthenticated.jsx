import React from 'react';

import Button from 'react-bootstrap/Button';;

import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [username, setUsername] = React.useState(props.username);
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  async function loginUser() {
    authenticate("/api/auth/login");
  }

  async function registerUser() {
    authenticate("/api/auth/create");
  }

  async function authenticate(endpoint) {
    try{
      const response = await fetch(endpoint, {
        method: "post",
        body: JSON.stringify({username: username,
          password: password,}),
          headers: {
            "Content-type": "application/json; charset = UTF-8"
          },
      })
      if(response?.status === 200) {
        localStorage.setItem('username', username);
        props.onLogin(username);
      } else {
        const body = await response.json();
        setError(`Something Went Wrong: ${body.msg}`);
      }
    }catch (error) {
      // Case 4: Network failure or server is completely unreachable
      setError("Request failed: The server is unreachable or down.");
    }
  }

  return (
    <>
      <div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Username</span>
          <input className='form-control' type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Password</span>
          <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        </div>
        <Button variant='primary' onClick={() => loginUser()} disabled={!username || !password}>
          Login
        </Button>
        <Button variant='secondary' onClick={() => registerUser()} disabled={!username || !password}>
          Register
        </Button>
      </div>
      <MessageDialog message={error} onHide={() => setError(null)} />
    </>
  );
}
