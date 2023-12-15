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
      <div className="container">
        {!this.state.gameStarted ? (
          <>
            <h1 className="title">Jotto</h1>
            <button onClick={this.startGame}>Play</button>
          </>
        ) : (
          <JottoGame />
        )}
      </div>
    );
  }
}

export default App;