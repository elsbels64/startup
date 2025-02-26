import React from 'react';

import Button from 'react-bootstrap/Button';;

export function Unauthenticated(props) {
  const [username, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');

  async function loginUser() {
    localStorage.setItem('userName', username);
    props.onLogin(username);
  }

  async function registerUser() {
    localStorage.setItem('userName', username);
    props.onLogin(username);
  }

  return (
    <>
      <div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Username</span>
          <input className='form-control' type='text' value={username} onChange={(e) => setUserName(e.target.value)} placeholder='username' />
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
    </>
  );
}
