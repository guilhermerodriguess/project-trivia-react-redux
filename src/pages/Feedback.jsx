import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Header from '../component/Header';

class Feedback extends React.Component {
  componentDidMount() {
    this.handleRanking();
  }

  handleRanking = () => {
    const { email, name, score } = this.props;
    const convertEmail = md5(email).toString();
    const urlFoto = `https://www.gravatar.com/avatar/${convertEmail}`;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const validateJSON = ranking === null ? '' : ranking;
    const scoreObj = { name, score, picture: urlFoto };
    const result = [...validateJSON, scoreObj];
    localStorage.setItem('ranking', JSON.stringify(result));
  }

  motivationMessage = () => {
    const { assertions, score } = this.props;
    const beBetter = 'Could be better...';
    const wellDone = 'Well Done!';
    const threeAsnwers = 3;

    localStorage.setItem('score', score);
    localStorage.setItem('assertions', assertions);

    if (assertions < threeAsnwers) return beBetter;
    if (assertions >= threeAsnwers) return wellDone;
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <main>
          <h1>Feedback</h1>
          <h2 data-testid="feedback-text">{ this.motivationMessage() }</h2>
          <p>Placar total:</p>
          <p data-testid="feedback-total-score">{score}</p>
          <p>Questões corretas:</p>
          <p data-testid="feedback-total-question">{assertions}</p>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  email: state.player.gravatarEmail,
  name: state.player.name,
});

export default connect(mapStateToProps)(Feedback);
