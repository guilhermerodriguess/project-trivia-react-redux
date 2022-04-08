import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../component/Header';

class Feedback extends React.Component {
  motivationMessage = () => {
    const { assertions, score } = this.props;
    const beBetter = <h2 data-testid="feedback-text">Could be better...</h2>;
    const wellDone = <h2 data-testid="feedback-text">Well Done!</h2>;
    const threeAsnwers = 3;

    localStorage.setItem('score', score);
    localStorage.setItem('assertions', assertions);

    if (assertions < threeAsnwers) return beBetter;
    if (assertions >= threeAsnwers) return wellDone;
  }

  render() {
    const { assertions, score } = this.props;
    console.log(assertions);
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
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
