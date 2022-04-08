import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import store from '../redux/store';
import { updateAssertions, updateScore, updateToken } from '../redux/actions';
import Timer from './Timer';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      validToken: false,
      respostaApi: 'vazio',
      index: 0,
      disabled: false,
      validateColor: false,
      shufleButtons: [],
      tempoAtual: 0,
      respondido: false,
    };
  }

  componentDidMount() {
    this.validateAPI();
    store.subscribe(this.updateToken);
  }

  updateToken = () => {
    this.setState((prevState) => ({
      validToken: !prevState.validToken,
    }));
  }

  requestAPI = async () => {
    const { token } = this.props;
    const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(endPoint);
    const responseJSOn = await response.json();
    this.setState({
      respostaApi: responseJSOn,
    });
    return responseJSOn;
  }

  validateAPI = async () => {
    const response = await this.requestAPI();
    const expirationCode = 3;
    if (response.response_code === expirationCode) {
      const { getToken } = this.props;
      getToken();
    }
    const { index } = this.state;
    const maxNumb = 4;
    if (index <= maxNumb) this.prepareQuestion();
  }

  handleBtn = ({ target }) => {
    this.setState({
      validateColor: true,
      respondido: true,
    });
    if (target.name === 'correct') {
      this.checkScore();
    }
  };

  shufleArray = (arr) => {
    const param = 0.5;
    const resultSort = arr.sort(() => Math.random() - param);
    return resultSort;
  }

  checkScore = () => {
    const {
      tempoAtual, respostaApi: { results },
      index,
    } = this.state;
    const { dispatchUpdatedScore, updateAssertion } = this.props;
    const hard = 3;
    let dificuldade = hard;
    switch (results[index].difficulty) {
    case ('easy'):
      dificuldade = 1;
      break;
    case ('medium'):
      dificuldade = 2;
      break;
    default:
      break;
    }
    const base = 10;
    const divided = 10;
    const assertions = base / divided;
    updateAssertion(assertions);
    const score = base + (tempoAtual * dificuldade);
    dispatchUpdatedScore(score);
  }

  disableBtn = (response, tempo) => {
    if (response) {
      this.setState({
        disabled: true,
        tempoAtual: tempo,
      });
    } else {
      this.setState({
        disabled: false,
      });
    }
  }

  prepareQuestion = () => {
    const { respostaApi: { results }, index } = this.state;
    const maxNumb = 4;
    if (results === undefined || index > maxNumb) return '';
    const question = results[index];
    const incorrectArr = [...question.incorrect_answers];
    const addIndex = incorrectArr.map((response, indexTwo) => ({
      response,
      ind: indexTwo,
    }));
    const arrButtons = [question.correct_answer, ...addIndex];
    const shufleButtons = this.shufleArray(arrButtons);
    this.setState({
      shufleButtons,
    });
  };

  renderQuestions = () => {
    const { respostaApi: { results }, index,
      shufleButtons, validateColor, disabled } = this.state;
    if (results === undefined) return '';
    const validGreen = validateColor === true ? { border: '3px solid rgb(6, 240, 15)' }
      : null;
    const validRed = validateColor === true ? { border: '3px solid rgb(255, 0, 0)' }
      : null;
    const question = results[index];
    return (
      <div>
        <h2 data-testid="question-category">{ question.category }</h2>
        <h2 data-testid="question-text">{ question.question }</h2>
        <div data-testid="answer-options">
          { shufleButtons.map((button, ind) => (
            <button
              style={ button === question.correct_answer ? (
                validGreen) : (validRed) }
              onClick={ this.handleBtn }
              name={ button === question.correct_answer
                ? ('correct') : ('incorrect') }
              key={ ind }
              type="button"
              disabled={ disabled }
              data-testid={ button === question.correct_answer ? (
                'correct-answer') : (`wrong-answer-${button.ind}`) }
            >
              { button.response === undefined ? button : button.response }
            </button>
          ))}
        </div>
      </div>
    );
  }

  nextQuestion = () => {
    const { index } = this.state;
    const MAX = 4;
    if (index > MAX) return null;
    this.setState((prevState) => ({
      index: prevState.index + 1,
      validateColor: false,
      respondido: false,
    }), () => { this.prepareQuestion(); });
  }

  renderNextQuestion = () => {
    const { validateColor } = this.state;
    if (validateColor === true) {
      return (
        <button
          type="button"
          onClick={ this.nextQuestion }
          data-testid="btn-next"
        >
          Next
        </button>
      );
    }
  }

  render() {
    const { index, respondido } = this.state;
    const MaxNumber = 4;
    if (index <= MaxNumber) {
      return (
        <div>
          <Timer
            disableBtn={ this.disableBtn }
            question={ index }
            respondido={ respondido }
          />
          { this.renderQuestions() }
          { this.renderNextQuestion() }
        </div>
      );
    }
    return (<Redirect to="/feedback" />);
  }
}

Questions.propTypes = {
  getToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  dispatchUpdatedScore: PropTypes.func.isRequired,
  updateAssertion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(updateToken()),
  dispatchUpdatedScore: (score) => dispatch(updateScore(score)),
  updateAssertion: (assertions) => dispatch(updateAssertions(assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
