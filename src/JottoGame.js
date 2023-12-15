import React from 'react';
import wordList from './jottoWordList.json';

class JottoGame extends React.Component {
  state = {
    secretWord: this.generateSecretWord(),
    guessedWords: [],
    currentGuess: '',
    gameWon: false,
    error: ''
  };

  generateSecretWord() {
    let secretWord = '';
    do {
      // Select a random word from the list
      secretWord = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
    } while (new Set(secretWord).size !== secretWord.length);
    
    return secretWord;
  }    

  handleGuess = (event) => {
    this.setState({ currentGuess: event.target.value.toLowerCase() });
  };

  submitGuess = () => {
    const { currentGuess, secretWord } = this.state;
  
    // Check if the guessed word is 5 letters long and exists in the word list
    if (currentGuess.length !== 5 || !wordList.includes(currentGuess)) {
      this.setState({ error: 'Please enter a valid 5-letter word from the list.' });
      return;
    }
  
    let matches = 0;
  
    // Calculate the number of matches
    let secretWordArray = secretWord.split('');
    let currentGuessArray = currentGuess.split('');
    for (let i = 0; i < secretWordArray.length; i++) {
      if (currentGuessArray.includes(secretWordArray[i])) {
        matches++;
      }
    }
  
    this.setState(state => ({
      guessedWords: [...state.guessedWords, { guess: state.currentGuess, matches }],
      currentGuess: '',
      gameWon: currentGuess === secretWord,
      error: ''
    }));
  };      

  playAgain = () => {
    this.setState({
      secretWord: this.generateSecretWord(),
      guessedWords: [],
      currentGuess: '',
      gameWon: false,
      error: ''
    });
  };

  render() {
    const { gameWon, guessedWords, currentGuess, error } = this.state;

    return (
      <div>
        <h2>Jotto Game</h2>
        {!gameWon ? (
          <>
            <input value={currentGuess} onChange={this.handleGuess} />
            <button onClick={this.submitGuess}>Guess</button>
            {error && <p>{error}</p>}
          </>
        ) : (
          <>
            <h2>You won! 🎉</h2>
            <button onClick={this.playAgain}>Play Again</button>
          </>
        )}
        <ul>
          {guessedWords.map((word, index) => (
            <li key={index}>{word.guess} - Matches: {word.matches}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default JottoGame;