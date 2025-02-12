import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { NavLink } from 'react-bootstrap';

export default function App() {
  return <div className='app bg-dark text-light'>
    <header>
      <div className =  "container-fluid">
        <h1>Higher Or Lower</h1>
      </div>
      <div className =  "container" data-bs-theme="dark">
        <nav className =  "navbar  navbar-expand-lg bg-body-tertiary">
          <NavLink to = "index" className =  "navbar-brand">Login</NavLink>
          <NavLink to = "game" className =  "navbar-brand">Game</NavLink>
          <NavLink to = "scores" className =  "navbar-brand">Scores</NavLink>
        </nav>
      </div>
    </header>

    <main>
      app components
    </main>

    <footer className = "fixed-bottom">
      <span className = "text-reset">Created by: Elise Wirthlin</span>
      <br/>
      <a href = "https://github.com/elsbels64/startup">GitHub</a>
    </footer>
  </div>;
}