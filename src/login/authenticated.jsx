import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { MessageDialog } from './messageDialog';


export function Authenticated(props) {
  const [error, setError] = React.useState(null);

  async function logout() {
    try{
      const response = await fetch("/api/auth/logout", {
      method: "delete",
      })
      if(response?.status === 204) {
        localStorage.removeItem('username');
        props.onLogout();
      } else {
        const body = await response.json();
        setError(`Something Went Wrong: ${body.msg}`);
      }
  }catch (error) {
    //Network failure or server is completely unreachable
    setError("Request failed: The server is unreachable or down.");
  }
}

  const navigate = useNavigate();

  return (
    <>
    <div>
      <div className='playerName'>{props.username}</div>
      <Button variant='primary' onClick={() => navigate('/game')}>
        Play
      </Button>
      <Button variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
    <MessageDialog message={error} onHide={() => setError(null)} />
    </>
  );
}