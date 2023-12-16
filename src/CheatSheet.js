import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const CheatSheet = ({ reset, onReset }) => {
    const colors = ['white', 'yellow', 'green', 'red'];
    const [letterColors, setLetterColors] = useState(
      alphabet.reduce((colors, letter) => ({ ...colors, [letter]: 'white' }), {})
    );
  
    useEffect(() => {
        if (reset) {
          setLetterColors(alphabet.reduce((colors, letter) => ({ ...colors, [letter]: 'white' }), {}));
          onReset();
        }
      }, [reset, onReset]);
  
    const changeColor = (letter) => {
      const currentColor = letterColors[letter];
      const index = (colors.indexOf(currentColor) + 1) % colors.length;
      setLetterColors({ ...letterColors, [letter]: colors[index] });
    };
  
    return (
        <div className="cheat-sheet">
        <h2 className="cheat-sheet-title">Cheat Sheet</h2>
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => changeColor(letter)}
            style={{ color: letterColors[letter] }}
            className="cheat-sheet-button"
            type="button"
          >
            {letter}
          </button>
        ))}
      </div>
    );
  };  

CheatSheet.propTypes = {
  reset: PropTypes.bool.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default CheatSheet;