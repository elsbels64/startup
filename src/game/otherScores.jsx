import React, { useEffect, useState } from 'react';

import "./otherScores.css"

export function OtherScores({ scores }) {
 

    //console.log(scores);
    return (
      <div className="other-scores">
        <h2>Other Players' Scores</h2>
        <ul>
          {scores.map((entry, index) => (
            <li key={index}>{entry.name}: {entry.score}</li>
          ))}
        </ul>
      </div>
    );
  }