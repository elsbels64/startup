import React from 'react';

export function Game() {
  return (
    <main>
      <div className = "container">
      <div className = "other-scores">
        <h2 id="notification-title">Other Player's Scores</h2>
        <ul className = "notification">
            <li className = "player-name">Someone scored 10</li>
            <li className = "player-name">SomeoneElse scored 7</li>
            <li className = "player-name">Elise scored 90</li>
          </ul>
      </div>
      <div className = "game">
        <div className = "score">
          <label for="count">Score</label>
          <input type="text" id="count" defaultValue="-" readonly/>
        </div>
        <div className = "game-display">
          <div className = "fliped-card-container">
            <div className = "card-front">
              <img src = "https://deckofcardsapi.com/static/img/AS.png" alt = "ace of spades"></img>
            </div>
            <div className = "card-back">
              <img src = "https://deckofcardsapi.com/static/img/back.png" alt = "the back of a card"></img>
            </div>
          </div>
        </div>
        <form id="prediction-form">
          <fieldset>
            <legend>Your Prediction</legend>
            <input type="radio" className = "btn-check" id="higher" name="varRadio" value="higher" autoComplete="off" required/>
            <label className = "btn btn-secondary" Htmlfor="higher">higher</label>
            <input type="radio" className = "btn-check" id="lower" name="varRadio" value="lower" required/>
            <label className = "btn btn-secondary"Htmlfor="lower">lower</label>
          </fieldset>
          <button type="submit">Flip</button>
        </form>
      </div>
    </div>
    </main>
  );
}