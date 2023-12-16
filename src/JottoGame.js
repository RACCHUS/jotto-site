import React from 'react';
import wordList from './jottoWordList.json';
import CheatSheet from './CheatSheet';

class JottoGame extends React.Component {
  state = {
    secretWord: this.generateSecretWord(),
    guessedWords: [],
    currentGuess: '',
    gameWon: false,
    error: '',
    resetColors: false,
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
      this.setState({ error: 'Please enter a valid 5-letter.' });
      return;
    }
  
    let matches = 0;
  
    // Calculate the number of matches
    let secretWordArray = secretWord.split('');
    let currentGuessArray = currentGuess.split('');
    for (const letter of secretWordArray) {
      if (currentGuessArray.includes(letter)) {
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

  handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    this.submitGuess();
  };

  playAgain = () => {
    this.setState({
      secretWord: this.generateSecretWord(),
      guessedWords: [],
      currentGuess: '',
      gameWon: false,
      error: '',
      resetColors: true,
    });
  };

  render() {
    const { gameWon, guessedWords, currentGuess, error } = this.state;
  
    return (
      <div className="game-container">
        <div>
          <form onSubmit={this.handleSubmit}>
            {!gameWon ? (
              <>
                <input value={currentGuess} onChange={this.handleGuess} />
                <button type="submit">Guess</button>
                {error && <p>{error}</p>}
              </>
            ) : (
              <>
                <h2>You won! 🎉</h2>
                <button onClick={this.playAgain}>Play Again</button>
              </>
            )}
          </form>
          <div className="guessed-words-container">
            <div className="game-content">
              <ul>
                {guessedWords.map((word) => (
                  <li key={word.guess}>{word.guess} - Matches: {word.matches}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <CheatSheet reset={this.state.resetColors} onReset={() => this.setState({ resetColors: false })} />
      </div>
    );
  }
}

export default JottoGame;