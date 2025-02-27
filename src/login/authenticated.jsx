import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  function logout() {
    localStorage.removeItem('username');
    props.onLogout();
  }

  const navigate = useNavigate();

  return (
    <div>
      <div className='playerName'>{props.username}</div>
      <Button variant='primary' onClick={() => navigate('/game')}>
        Play
      </Button>
      <Button variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}