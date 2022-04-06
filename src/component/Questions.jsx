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
  }

  validateAPI = async () => {
    const response = await this.requestAPI();
    const expirationCode = 3;
    if (response.response_code === expirationCode) {
      const { getToken } = this.props;
      getToken();
    }
  }

  shufleArray = (arr) => {
    const param = 0.5;
    const resultSort = arr.sort(() => Math.random() - param);
    return resultSort;
  }

  renderQuestions = () => {
    const { respostaApi: { results } } = this.state;
    return results === undefined ? null : results.map((question, index) => {
      const incorrectArr = [...question.incorrect_answers];
      const addIndex = incorrectArr.map((response, indexTwo) => ({
        response,
        ind: indexTwo,
      }));
      const arrButtons = [question.correct_answer, ...addIndex];
      const shufleButtons = this.shufleArray(arrButtons);
      return (
        <div key={ index }>
          <h2 data-testid="question-category">{ question.category }</h2>
          <h2 data-testid="question-text">{ question.question }</h2>
          <div data-testid="answer-options">
            {shufleButtons.map((button, ind) => (
              <button
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
    });
  }

  render() {
    return (
      <div>
        {this.renderQuestions()}
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
