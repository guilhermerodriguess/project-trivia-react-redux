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
    const { question, disableBtn } = this.props;
    if (prevProps.question !== question) {
      this.setState({
        tempo: 30,
      }, () => {
        disableBtn(false);
        this.handleTime();
      });
    }
  }

  handleTime = () => {
    const { respondido } = this.props;
    if (respondido) {
      this.setState((prevState) => ({
        tempo: prevState.tempo + 1,
      }), () => {
        const { tempo } = this.state;
        const { disableBtn } = this.props;
        disableBtn(true, tempo);
      });
      return null;
    }
    const { tempo } = this.state;
    if (tempo === 0) {
      const { disableBtn } = this.props;
      disableBtn(true);
      return null;
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
      <div>
        <p>{ tempo }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  disableBtn: propTypes.func.isRequired,
  question: propTypes.number.isRequired,
  respondido: propTypes.bool.isRequired,
};

export default Timer;
