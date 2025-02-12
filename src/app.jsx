import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className='app'>
        <header>
      <div className =  "container-fluid">
        <h1 style = "text-align: center;">Higher Or Lower</h1>
      </div>
      <div className =  "container" data-bs-theme="dark">
        <nav className =  "navbar  navbar-expand-lg bg-body-tertiary">
          <a href="index.html" className =  "navbar-brand">Login</a>
          <a href="game.html" className =  "navbar-brand">Game</a>
          <a href="scores.html" className =  "navbar-brand">Scores</a>
        </nav>
      </div>
    </header>

    <main>
      app components
    </main>

    <footer className = "fixed-bottom">
      <span className = "text-reset">Created by: Elise Wirthlin</span>
      <br/>
      <a href="https://github.com/elsbels64/startup">GitHub</a>
    </footer>
  </div>;
}