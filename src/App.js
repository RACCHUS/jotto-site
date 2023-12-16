import './App.css';
import React from 'react';
import JottoGame from './JottoGame'; // This is where you would implement the Jotto game logic

class App extends React.Component {
  state = {
    gameStarted: false,
    currentDate: new Date(),
    showRules: false
  };

  openRules = () => {
    this.setState({ showRules: true });
  };
  
  closeRules = () => {
    this.setState({ showRules: false });
  };

  startGame = () => {
    this.setState({ gameStarted: true });
  };

  componentDidMount() {
    const box = document.getElementById('logo-box');
    const words = ['J', 'o', 't', 't', 'o']; // Replace with your words or letters

    words.forEach(word => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.position = 'absolute';
      span.style.left = Math.random() * 100 + '%';
      span.style.top = Math.random() * 100 + '%';
      box.appendChild(span);
    });
  }

  render() {
    return (
      <>
        {!this.state.gameStarted && <div id="logo-box"></div>}
        {!this.state.gameStarted && <header><h1 className="title">Jotto</h1></header>}
        {this.state.gameStarted && <header id="game-header">
          <div className="help-icon" onClick={this.openRules}>?</div>
          <h1 id="jotto-game-header">Jotto</h1>
        </header>}
        {this.state.showRules && (
          <div className="rules-modal">
            <div className="close-icon" onClick={this.closeRules}>x</div>
            <h2>Rules of Jotto
              <ol>
              <li>The game starts by choosing a 5-letter secret word.</li>
              <li>Take turns guessing 5-letter words.</li>
              <li>After each guess, the player is told how many letters their guessed word has in common with the secret word. This is called the "Jotto number".</li>
              <li>The game continues until the player correctly guesses the secret word.</li>
              </ol>
            </h2>
            {/* Add your rules here */}
          </div>
        )}
        {!this.state.gameStarted && <p>Go ahead, have a go.</p>}
          {!this.state.gameStarted ? (
            <button onClick={this.startGame} className="app-button">Play</button>
          ) : (
            <JottoGame />
          )}
        {!this.state.gameStarted && <footer>Made by RACCHUS - {this.state.currentDate.toDateString()}</footer>}
      </>
    );
  }
}

export default App;