# Trivia Game

Hello! Welcome to the Trivia Game project repository! In this project, we developed a question and answer game based on the Trivia game, using React and Redux. We worked as a group to implement the game's features, following the demands defined on a Kanban board.

## Project description

The Trivia Game is a question and answer game where players can test their knowledge in different categories. The user can log in to the game and, if the email is registered on the Gravatar website, have their photo associated with their profile. Then, she can access the game page, where she must choose an answer among the available options for each question presented. It is important to answer before the time counter reaches zero, otherwise the answer will be considered wrong. After answering five questions, the person will be redirected to the score screen, where they will see feedback based on the number of correct answers. She will also have the option to view the ranking page, if she wishes, at the end of each game. In addition, it is possible to configure some game options in a configuration screen, accessible through the application's header.

## Functionalities

- Login screen: The player person must fill in the name and email information to start a game.
- Start the game button: When clicking on the "Play" button, a request is made to the API to obtain a token and redirect the person to the game screen.
- Setup button: The home screen has a button that takes you to the game setup screen.
- Login screen tests: Development of unit tests to achieve 90% login screen coverage.
- Game Header: The header displays the player's information, such as Gravatar image, name and score.
- Game page: The game page displays the information related to the question, such as category, alternatives and timer.
- Style of the answers: When clicking on an answer, the correct alternative turns green and the incorrect ones turn red.
- Timer: The page has a timer with a limit of 30 seconds to answer each question. If time runs out, the answer will be considered wrong.
- Scoreboard: By answering correctly, the player accumulates points on the scoreboard.
- "Next" button: After answering the question, a "Next" button appears to advance to the next question.
- Five questions: The game consists of five questions, and the timer is restarted with each new question. After answering all, the person will be redirected to the feedback screen.
- Feedback header: The feedback screen displays the player's information, including the score achieved.
- Feedback message: The feedback screen displays a message related to the person's performance in the game.
- Results information: The feedback screen shows information about the person's performance, such as final score and number of correct questions.
- Option to play again: The person has the

  option to play again by clicking the "Play Again" button which will take you back to the login screen.
- Option to view the ranking: It is possible to view the ranking by clicking on a button that redirects to the ranking screen.
- Feedback Screen Tests: Development of unit tests to achieve 90% coverage of the feedback screen.
- Home button: The ranking screen has a button that redirects the person back to the login screen.
- Ranking content: The ranking screen displays a list with the image, name and score of the people who played, stored in localStorage.
- Ranking Screen Tests: Development of unit tests to achieve 90% ranking screen coverage.
- Game screen tests: Development of unit tests to achieve 90% game screen coverage.
- Application coverage tests: Development of unit tests to reach 95% of total application coverage.

## Technologies Used

During the development of this project, we used the following technologies:

- React
- redux
- Router
- React TestingLibrary

## How to Run the Project

To run the project on your local machine, follow the instructions below:

1. Clone this repository.
2. Navigate to the project directory: `cd trivia-game`.
3. Install the project's dependencies: `npm install`.
4. Run the project: `npm start`.
5. Access the application in your browser at `http://localhost:3000`.

## Skills Developed

During the development of this project, we improved our skills in the following areas:

- Using React to build interactive interfaces.
- State management using Redux.
- Browsing between pages using the Router.
- Implementation of unit tests using the React Testing Library.

Feel free to explore the project's source code and contribute improvements. If in doubt, we are available to help. Have fun playing the Trivia Game!
