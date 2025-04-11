import React, { useEffect, useState } from 'react';
import { GameEvent, GameNotifier } from './gameNotifier';

import "./otherScores.css"

export function OtherScores() {

  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    GameNotifier.addHandler(handleSentScore);

    return () => {
      GameNotifier.removeHandler(handleSentScore);
    };
  });

  function handleSentScore(score) {
    setScores([...scores, score]);
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of scores.entries()) {
      let message = 'unknown';
      if (event.type === GameEvent.End) {
        message = `scored ${event.value.score}`;
      // } else if (event.type === GameEvent.Start) {
      //   message = `started a new game`;
      } else if (event.type === GameEvent.System) {
        message = event.value.msg;
      }

      messageArray.push(
        <div key={i} className='score'>
          <ul>
              <li className={'player-event'}>{event.from}: {message}</li>
          </ul>
        </div>
      );
    }
    return messageArray;
  }

    return (
      <div className="other-scores">
        <h2>Other Players' Scores</h2>
        <div id ='player-scores'>{createMessageArray()}</div>
      </div>
    );
  }