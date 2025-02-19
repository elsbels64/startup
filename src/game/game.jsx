import React, { useState } from 'react';
import './game.css';

export function Game() {

  const defaultCards = [
    { image: "https://deckofcardsapi.com/static/img/AS.png", code: "AS" },
    { image: "https://deckofcardsapi.com/static/img/KD.png", code: "KD" },
    { image: "https://deckofcardsapi.com/static/img/QH.png", code: "QH" }
  ];

  const [card, setCard] = useState(defaultCards[0]);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const flipCard = async (event) => {
    event.preventDefault();
    const prevCard = card;
    try {
      const response = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1");
      const data = await response.json();
      if (data.cards && data.cards.length > 0) {
        const newCard = { image: data.cards[0].image, code: data.cards[0].code };
        setCard(newCard);
        if(isNewCardHigher(prevCard.code, newCard.code) == true){
          console.log("New card is higher")
        }else{
          console.log("New card is lower")
        }
      } else {
        throw new Error("No cards received from API");
      }
    } catch (error) {
      console.error("API request failed, using fallback card", error);
      setFallbackIndex((prevIndex) => (prevIndex + (Math.floor(Math.random() * 10))) % defaultCards.length);
      setCard(defaultCards[fallbackIndex]);
      const newCard = defaultCards[fallbackIndex]
      if(isNewCardHigher(prevCard.code, newCard.code) == true){
        console.log("New card is higher")
      }else{
        console.log("New card is lower")
      }
    }
  };

  const cardValues = {
    "A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
    "J": 11, "Q": 12, "K": 13
  };
  
  const isNewCardHigher = (prevCardCode, newCardCode) => {
    const prevValue = cardValues[prevCardCode.slice(0, -1)];
    const newValue = cardValues[newCardCode.slice(0, -1)];
    return newValue > prevValue;
  };

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
          <label htmlFor="count">Score</label>
          <input type="text" id="count" defaultValue="-" readOnly/>
        </div>
        <div className = "game-display">
          <div className = "fliped-card-container">
            <div className = "card-front">
              <img src={card.image} alt={`Card: ${card.code}`} />
            </div>
            <div className = "card-back">
              <img src = "https://deckofcardsapi.com/static/img/back.png" alt = "the back of a card"></img>
            </div>
          </div>
        </div>
        <form id="prediction-form" onSubmit={flipCard}>
          <fieldset>
            <legend>Your Prediction</legend>
            <input type="radio" className = "btn-check" id="higher" name="varRadio" value="higher" autoComplete="off" required/>
            <label className = "btn btn-secondary" htmlFor="higher">higher</label>
            <input type="radio" className = "btn-check" id="lower" name="varRadio" value="lower" required/>
            <label className = "btn btn-secondary"htmlFor="lower">lower</label>
          </fieldset>
          <button type="submit">Flip</button>
        </form>
      </div>
    </div>
    </main>
  );
}