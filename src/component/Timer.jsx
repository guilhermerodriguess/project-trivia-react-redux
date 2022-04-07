import React from 'react';
import propTypes from 'prop-types';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      tempo: 30,
    };
  }

  componentDidMount() {
    this.handleTime();
  }

  componentDidUpdate(prevProps) {
    this.resetTime(prevProps);
  }

  resetTime = (prevProps) => {
    const { question } = this.props;
    if (prevProps.question !== question) {
      this.setState({
        tempo: 30,
      }, () => {
        this.handleTime();
        const { disableBtn } = this.props;
        disableBtn(false);
      });
    }
  }

  handleTime = () => {
    const { tempo } = this.state;
    if (tempo === 0) {
      const { disableBtn } = this.props;
      disableBtn(true);
      return true;
    }
    const onesec = 1000;
    setTimeout(() => {
      this.setState((prevState) => ({
        tempo: prevState.tempo - 1,
      }));
      this.handleTime();
    }, onesec);
  }

  render() {
    const { tempo } = this.state;
    return (
      <p>{ tempo }</p>
    );
  }
}

Timer.propTypes = {
  disableBtn: propTypes.func.isRequired,
  question: propTypes.number.isRequired,
};

export default Timer;
