import React from 'react';
import Header from '../component/Header';
import Questions from '../component/Questions';

class Game extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Questions />
      </>
    );
  }
}

Game.propTypes = {

};

export default Game;
