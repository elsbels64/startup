import React, { useState, useEffect } from "react";
import "./game.css";
import { OtherScores } from "./otherScores.jsx";
import { GameEvent, GameNotifier } from './gameNotifier';

export function Game(props) {
  const defaultCards = [
    { image: "https://deckofcardsapi.com/static/img/AS.png", code: "AS" },
    { image: "https://deckofcardsapi.com/static/img/KD.png", code: "KD" },
    { image: "https://deckofcardsapi.com/static/img/QH.png", code: "QH" }
  ];

  const [card, setCard] = useState(defaultCards[0]);
  const [prevCard, setPrevCard] = useState(null);
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [runningScore, setRunningScore] = useState(0);
  const [score, setScore] = useState(0);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    setPrevCard(card);
  }, [card]);

  useEffect(() => {
    fetch("/api/scores")
    .then((response) => response.json())
    .then((scores) => {
      setScores(scores);
    })
    setScores(scores);
  }, [score]);

  const flipCard = async (event) => {
    event.preventDefault();
    const userPrediction = document.querySelector('input[name="varRadio"]:checked')?.value;

    if (!userPrediction) {
      alert("Please select higher or lower before flipping.");
      return;
    }

    try {
      const response = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1");
      const data = await response.json();

      if (data.cards && data.cards.length > 0) {
        const newCard = { image: data.cards[0].image, code: data.cards[0].code };
        setCard(newCard);
        updateScore(prevCard, newCard, userPrediction);
      } else {
        throw new Error("No cards received from API");
      }
    } catch (error) {
      console.error("API request failed, using fallback card", error);
      setFallbackIndex((prevIndex) => {
        const newIndex = (prevIndex + Math.floor(Math.random() * 10)) % defaultCards.length;
        setCard(defaultCards[newIndex]);
        updateScore(prevCard, defaultCards[newIndex], userPrediction);
        return newIndex;
      });
    }
  };

  const cardValues = {
    "A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "0": 10,
    "J": 11, "Q": 12, "K": 13
  };

  const getCardRank = (cardCode) => cardCode[0];


  const isNewCardHigher = (prevCardCode, newCardCode) => {
    const prevValue = cardValues[getCardRank(prevCardCode)];
    // console.log(`prev value ${prevValue}`);
    const newValue = cardValues[getCardRank(newCardCode)];
    // console.log(`new value ${newValue}`);
    return newValue > prevValue;
  };

  const areCardsEqual = (prevCardCode, newCardCode) => {
    return cardValues[getCardRank(prevCardCode)] === cardValues[getCardRank(newCardCode)];
  };

  const updateScore = (prev, next, prediction) => {
    if (!prev) return;
    const isHigher = isNewCardHigher(prev.code, next.code);
    const isEqual = areCardsEqual(prev.code, next.code);
    // console.log(`${prev.code}, ${next.code}`)
    // console.log(`is higher: ${isHigher}; is equal ${isEqual}`)

    if (isEqual || (isHigher && prediction === "higher") || (!isHigher && prediction === "lower")) {
      setRunningScore((prevScore) => prevScore + 1);
    } else {
      // console.log("wrong guess")
      const newScore = { name: props.username, score: runningScore };
      setScore(runningScore);
      saveScore(newScore, '/api/score');
      GameNotifier.broadcastEvent(username, GameEvent.End, newScore);
      saveScore(newScore, '/api/highScore');
      setRunningScore(0);
    }
  };

  
  async function saveScore(score, request) {
    await fetch(request, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(score),
    });
  }


  return (
    <main>
      <div className="container">
        <OtherScores/>
        <div className="game">
          <div className="score">
            <label htmlFor="count">Score</label>
            <input type="text" id="count" value={runningScore} readOnly />
          </div>
          <div className="game-display">
            <img src={card.image} alt={`Card: ${card.code}`} />
          </div>
          <form id="prediction-form" onSubmit={flipCard}>
            <fieldset>
              <legend>Your Prediction</legend>
              <input type="radio" className="btn-check" id="higher" name="varRadio" value="higher" required />
              <label className="btn btn-secondary" htmlFor="higher">Higher</label>
              <input type="radio" className="btn-check" id="lower" name="varRadio" value="lower" required />
              <label className="btn btn-secondary" htmlFor="lower">Lower</label>
            </fieldset>
            <button type="submit">Flip</button>
          </form>
        </div>
      </div>
    </main>
  );
}