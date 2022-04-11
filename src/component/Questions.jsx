import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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
      respostaApi: this.fixQuestion(responseJSOn),
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
      respostaApi: { results },
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
      dificuldade = hard;
    }
    const { time } = this.props;
    const base = 10;
    const assertions = 1;
    const score = base + (time * dificuldade);
    dispatchUpdatedScore(score);
    updateAssertion(assertions);
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

  // arruma os &quot e &#039
  fixQuestion = (respostaApi) => {
    respostaApi.results.forEach((obj) => {
      obj.question = obj.question.replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
      obj.correct_answer = obj.correct_answer.replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
      obj.incorrect_answers = obj.incorrect_answers
        .map((value) => value.replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'"));
    });
    return respostaApi;
  }

  renderQuestions = () => {
    const { respostaApi: { results }, index,
      shufleButtons, validateColor, disabled } = this.state;
    if (results === undefined) return '';
    const validGreen = validateColor === true ? 'success'
      : null;
    const validRed = validateColor === true ? 'danger'
      : null;
    const question = results[index];
    return (
      <div className="questionsMain">
        <div className="questions">
          <h2
            data-testid="question-category"
            className="question-category"
          >
            { question.category }

          </h2>
          <h2
            data-testid="question-text"
            className="question-text"
          >
            { question.question }

          </h2>
        </div>
        <div data-testid="answer-options" className="answer-container">
          <div className="answer-options">
            { shufleButtons.map((button, ind) => (
              <Button
                variant={ button === question.correct_answer ? (
                  validGreen) : (validRed) }
                onClick={ this.handleBtn }
                name={ button === question.correct_answer
                  ? ('correct') : ('incorrect') }
                key={ ind }
                type="button"
                disabled={ disabled }
                className="options-button"
                data-testid={ button === question.correct_answer ? (
                  'correct-answer') : (`wrong-answer-${button.ind}`) }
              >
                { button.response === undefined ? button : button.response }
              </Button>
            ))}
          </div>
          <div>
            { this.renderNextQuestion() }
          </div>
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
    const { disabled } = this.state;
    if (disabled === true) {
      return (
        <Button
          variant="primary"
          size="lg"
          type="button"
          onClick={ this.nextQuestion }
          className="btn-next"
          data-testid="btn-next"
        >
          Next
        </Button>
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
  time: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  time: state.time,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(updateToken()),
  dispatchUpdatedScore: (score) => dispatch(updateScore(score)),
  updateAssertion: (assertions) => dispatch(updateAssertions(assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
