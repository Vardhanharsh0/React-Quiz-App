import React, { useState } from 'react';
import HighScores from './HighScores'; // Import the new component

const Results = ({ score, totalQuestions, userAnswers, onRestart }) => {
  // State to hold the player's name from the input field
  const [playerName, setPlayerName] = useState('');
  // State to track if the score has been saved to hide the form
  const [scoreSaved, setScoreSaved] = useState(false);

  /**
   * Handles saving the user's score to localStorage.
   */
  const handleSaveScore = (e) => {
    e.preventDefault(); // Prevent the form from causing a page refresh
    if (!playerName.trim()) {
      // Use a custom alert/modal in a real app, but alert is fine for this
      alert('Please enter your name to save your score.');
      return;
    }

    // 1. Read existing scores from localStorage, or initialize an empty array if none exist
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    // 2. Add the new score object to the array
    const newScore = { name: playerName, score };
    highScores.push(newScore);

    // 3. Sort scores in descending order (highest score first)
    highScores.sort((a, b) => b.score - a.score);
    
    // 4. Keep only the top 10 scores
    const topScores = highScores.slice(0, 10);

    // 5. Save the updated & sorted list back to localStorage
    localStorage.setItem('highScores', JSON.stringify(topScores));
    
    // Update state to hide the form and give user feedback
    setScoreSaved(true);
  };

  return (
    <div className="results-container">
      <h2>Quiz Complete!</h2>
      <p className="final-score">
        You scored {score} / {totalQuestions}
      </p>

      {/* Conditionally render the save score form. It disappears after saving. */}
      {!scoreSaved ? (
        <form onSubmit={handleSaveScore} className="save-score-form">
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            aria-label="Player name for high score"
          />
          <button type="submit">Save Score</button>
        </form>
      ) : (
        <p>Your score has been saved!</p>
      )}

      {/* The detailed summary of answers */}
      <div className="answer-summary">
        <h3>Your Answers:</h3>
        {userAnswers.map((answer, index) => (
          <div key={index} className={`summary-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
            <p className="summary-question" dangerouslySetInnerHTML={{ __html: `Q: ${answer.question}`}} />
            <p>Your answer: <span dangerouslySetInnerHTML={{ __html: answer.selectedAnswer || 'Not answered' }} /></p>
            {!answer.isCorrect && (
              <p>Correct answer: <span dangerouslySetInnerHTML={{ __html: answer.correctAnswer }} /></p>
            )}
          </div>
        ))}
      </div>

      <button className="restart-button" onClick={onRestart}>
        Restart Quiz
      </button>

      {/* Display the HighScores component to show the leaderboard */}
      <HighScores />
    </div>
  );
};

export default Results;

