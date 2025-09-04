React Quiz App
A clean and responsive quiz application built with React to test users' knowledge in computer science. This project fetches questions from the Open Trivia DB API and includes features like a countdown timer, scoring, a detailed results summary, and persistent high scores.

This application was developed as a front-end assessment to demonstrate core React concepts, effective state management with hooks, and interaction with external APIs.

Features Implemented
Dynamic Question Fetching: Loads 10 multiple-choice questions from the Open Trivia DB API (Computer Science category).

Responsive UI: The layout is fully responsive and works seamlessly on desktop and mobile devices.

One Question at a Time: Displays a single question with four shuffled answer options to ensure a focused user experience.

Live Score Tracking: The user's score is updated and displayed in real-time.

Progress Indicator: Shows the user their current progress (e.g., "Question 3 of 10").

Detailed Results Page: At the end of the quiz, users can review a summary of their answers, showing which were correct and incorrect.

Restart Functionality: Allows users to restart the quiz with a new set of questions.

Bonus Features
Countdown Timer: A 30-second timer is implemented for each question. If the timer runs out, the app automatically proceeds to the next question.

Persistent High Scores: Users can save their scores with their name. The top 10 scores are stored in localStorage and displayed on a leaderboard.

Tech Stack
React: The core of the application, built using functional components and hooks (useState, useEffect).

Vite: Used as the build tool and development server for a fast and modern workflow.

JavaScript (ES6+): For all application logic.

CSS: For custom styling and a responsive layout.

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Make sure you have Node.js and npm installed on your machine.

Node.js (which includes npm)

Installation & Setup
Clone the repository:

git clone [https://github.com/YOUR_USERNAME/react-quiz-app.git](https://github.com/YOUR_USERNAME/react-quiz-app.git)

Navigate to the project directory:

cd react-quiz-app

Install NPM packages:

npm install

Run the development server:

npm run dev

Open your browser and navigate to http://localhost:5173 (or the URL provided in your terminal).
