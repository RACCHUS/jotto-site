import './App.css';
import React from 'react';
import JottoGame from './JottoGame'; // This is where you would implement the Jotto game logic

class App extends React.Component {
  state = {
    gameStarted: false
  };

  startGame = () => {
    this.setState({ gameStarted: true });
  };

  render() {
    return (
      <>
        <header>
            <h1 className="title">Jotto</h1>
        </header>
        <p>Go ahead, have a go.</p>
        <div className="container">
          {!this.state.gameStarted ? (
            <button onClick={this.startGame} className="app-button">Play</button>
          ) : (
            <JottoGame />
          )}
        </div>
      </>
    );
  }
}

export default App;