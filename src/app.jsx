import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
// import { NavLink } from 'react-bootstrap';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Scores } from './scores/scores';

export const AuthState = {
  Authenticated: 'Authenticated',
  Unauthenticated: 'Unauthenticated'
};

export default function App() {
  const savedUserName = localStorage.getItem('userName') || '';
  const savedAuthState = localStorage.getItem('authState') || AuthState.Unauthenticated;

  const [userName, setUserName] = React.useState(savedUserName);
  const [authState, setAuthState] = React.useState(savedAuthState);

  const handleAuthChange = (newUserName, newAuthState) => {
    setUserName(newUserName);
    setAuthState(newAuthState);
    localStorage.setItem('userName', newUserName);
    localStorage.setItem('authState', newAuthState);
  };
  
  return (
  <BrowserRouter>
  <div className='app bg-dark text-light'>
    <header>
      <div className =  "container-fluid">
        <h1>Higher Or Lower</h1>
      </div>
      <div className =  "container" data-bs-theme="dark">
        <nav className =  "navbar  navbar-expand-lg bg-body-tertiary">
          <NavLink to = "/" className =  "navbar-brand">Login</NavLink>
          {authState === AuthState.Authenticated && (
                <NavLink className='nav-link' to='game'>
                  Game
                </NavLink>
              )}
          <NavLink to = "scores" className =  "navbar-brand">Scores</NavLink>
        </nav>
      </div>
    </header>

    <Routes>
          <Route
            index
            element={<Login userName={userName} authState={authState} onAuthChange={handleAuthChange} />}
          />
          <Route path='/game' element={<Game userName={userName} />} />
          <Route path='/scores' element={<Scores />} />
          <Route path='*' element={<NotFound />} />
        
    </Routes>
    <footer className = "fixed-bottom">
      <span className = "text-reset">Created by: Elise Wirthlin</span>
      <br/>
      <a href = "https://github.com/elsbels64/startup">GitHub</a>
    </footer>
  </div>
  </BrowserRouter>);
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }