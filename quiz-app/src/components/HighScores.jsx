import React, { useState, useEffect } from 'react';

/**
 * A component that displays a list of the top high scores
 * by reading them from the browser's localStorage.
 */
const HighScores = () => {
  // State to hold the array of high scores
  const [highScores, setHighScores] = useState([]);

  // The useEffect hook runs once when the component is first rendered
  useEffect(() => {
    // 1. Read the raw JSON string of scores from localStorage.
    //    If 'highScores' doesn't exist, it defaults to null.
    const savedScoresJSON = localStorage.getItem('highScores');
    
    // 2. Parse the JSON string into a JavaScript array.
    //    If the string was null, default to an empty array [].
    const savedScores = JSON.parse(savedScoresJSON) || [];
    
    // 3. Update the component's state with the loaded scores.
    setHighScores(savedScores);
  }, []); // The empty dependency array [] means this effect runs only once.

  return (
    <div className="high-scores-container">
      <h3>High Scores</h3>
      
      {/* Conditionally render the list or a message */}
      {highScores.length > 0 ? (
        // If there are scores, map over them and display them in an ordered list
        <ol className="high-scores-list">
          {highScores.map((score, index) => (
            <li key={index}>
              {score.name}: <span>{score.score}</span>
            </li>
          ))}
        </ol>
      ) : (
        // If there are no scores, show a friendly message
        <p>No high scores yet. Be the first!</p>
      )}
    </div>
  );
};

export default HighScores;