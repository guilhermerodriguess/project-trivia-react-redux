import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Header from '../component/Header';

class Feedback extends React.Component {
  componentDidMount() {
    this.handleRanking();
  }

  compare = (a, b) => {
    const negativo = -1;
    if (a.score > b.score) return negativo;
    if (a.score < b.score) return 1;
    return 0;
  }

  handleRanking = () => {
    const { email, name, score } = this.props;
    const convertEmail = md5(email).toString();
    const urlFoto = `https://www.gravatar.com/avatar/${convertEmail}`;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const validateJSON = ranking === null ? '' : ranking;
    const scoreObj = { name, score, picture: urlFoto };
    const result = [...validateJSON, scoreObj];
    result.sort(this.compare);
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

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <main>
          <div className="feedback">
            <h1 data-testid="feedback-text">{ this.motivationMessage() }</h1>
            <p>Placar total:</p>
            <p data-testid="feedback-total-score">{score}</p>
            <p>Questões corretas:</p>
            <p data-testid="feedback-total-question">{assertions}</p>
          </div>
          <div className="feedback-buttons">
            <Link to="/ranking">
              <Button
                variant="info"
                type="button"
                data-testid="btn-ranking"
              >
                Ranking
              </Button>
            </Link>
            <Button
              variant="info"
              type="button"
              data-testid="btn-play-again"
              onClick={ this.playAgain }
            >
              Pagina inicial
            </Button>
          </div>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
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
