import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import store from '../redux/store';
import { updateToken } from '../redux/actions';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      validToken: false,
      respostaApi: 'vazio',
      index: 0,
      validateColor: false,
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
  }

  handleBtn = ({target}) => {
  this.setState({
    validateColor: true,
  })
  };

  shufleArray = (arr) => {
    const param = 0.5;
    const resultSort = arr.sort(() => Math.random() - param);
    return resultSort;
  }

  renderQuestions = () => {
    const { respostaApi: { results }, index, validateColor } = this.state;
    if (results === undefined) return '';
    const question = results[index];
    const incorrectArr = [...question.incorrect_answers];
    const addIndex = incorrectArr.map((response, indexTwo) => ({
      response,
      ind: indexTwo,
    }));
    const arrButtons = [question.correct_answer, ...addIndex];
    const shufleButtons = this.shufleArray(arrButtons);
    const validateGreen = validateColor === true ? {border: "3px solid rgb(6, 240, 15)"} :
    null;
    const validateRed = validateColor === true ? {border: "3px solid rgb(255, 0, 0)"} : null;
    return (
      <div>
        <h2 data-testid="question-category">{ question.category }</h2>
        <h2 data-testid="question-text">{ question.question }</h2>
        <div data-testid="answer-options">
          { shufleButtons.map((button, ind) => (
            <button style={ button === question.correct_answer ? (
              validateGreen) : (validateRed) }
              onClick={ this.handleBtn }
              key={ ind }
              type="button"
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
    this.setState((prevState) => ({
      index: prevState.index + 1,
    }));
    this.setState({
      validateColor: false,
    })
  }

  render() {
    return (
      <div>
        { this.renderQuestions() }
        <button
          type="button"
          onClick={ this.nextQuestion }
        >
          Next
        </button>
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
