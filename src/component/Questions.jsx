import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';
import { updateToken } from '../redux/actions';
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
    };
  }
  // correção

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
    this.prepareQuestion();
  }

  handleBtn = () => {
    this.setState({
      validateColor: true,
    });
  };

  shufleArray = (arr) => {
    const param = 0.5;
    const resultSort = arr.sort(() => Math.random() - param);
    return resultSort;
  }

  disableBtn = (response) => {
    if (response) {
      this.setState({
        disabled: true,
      });
    } else {
      this.setState({
        disabled: false,
      });
    }
  }

  prepareQuestion = () => {
    const { respostaApi: { results }, index } = this.state;
    if (results === undefined) return '';
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
    const MAX = 5;
    if (index === MAX) return null;
    this.setState((prevState) => ({
      index: prevState.index + 1,
      validateColor: false,
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
    const { index } = this.state;
    return (
      <div>
        <Timer
          disableBtn={ this.disableBtn }
          tempo={ 30 }
          question={ index }
        />
        { this.renderQuestions() }
        { this.renderNextQuestion() }
      </div>
    );
  }
}

Questions.propTypes = {
  getToken: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(updateToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
