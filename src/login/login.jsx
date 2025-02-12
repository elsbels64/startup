import React from 'react';

export function Login() {
  return (
    <main>
      <h1 className = "title">Login to Play!</h1>
      <form method="get" action="game.html" class = "login-form">
        <div>
          <span>username</span>
          <input type="text" placeholder="your username" />
        </div>
        <div>
          <span> password</span>
          <input type="password" placeholder="password" />
        </div>
        <div>
          <button type="submit">Login</button>
          <button type="submit">Register</button>
        </div>
      </form>
    </main>
  );
}