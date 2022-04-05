// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../component/Header';
import Questions from '../component/Questions';

class Game extends React.Component {
//   constructor() {
//     super();
//   }

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

export default connect()(Game);
