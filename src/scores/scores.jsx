import React, { useState, useEffect } from 'react';

export function Scores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("highScores")) || [];
    console.log(storedScores)
    setScores(storedScores);
  }, []);


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