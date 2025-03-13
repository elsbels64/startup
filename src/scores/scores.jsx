import React, { useState, useEffect } from 'react';

export function Scores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch("/api/highScores")
    .then((response) => response.json())
    .then((highScores) => {
      setScores(highScores);
    })
  }, []);

  console.log(scores)

  return (
    <main>
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>High Score</th>
      </tr>
    </thead>
    <tbody>
    {scores.map((entry, index) => (
          <tr key={index}>
            <td>{entry.name}</td>
            <td>{entry.score}</td>
          </tr>
        ))}
    </tbody>
  </table>
</main>
  );
}