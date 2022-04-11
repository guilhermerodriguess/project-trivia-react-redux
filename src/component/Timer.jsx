import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTimer } from '../redux/actions';

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
        tempo: prevState.tempo + 2,
      }), () => {
        const { disableBtn } = this.props;
        disableBtn(true);
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
    const { atualizaTempo } = this.props;
    setTimeout(() => {
      this.setState((prevState) => ({
        tempo: prevState.tempo - 1,
      }));
      atualizaTempo(tempo);
      this.handleTime();
    }, onesec);
  }

  render() {
    const { tempo } = this.state;
    return (
      <div className="timer">
        <h2>{ tempo }</h2>
      </div>
    );
  }
}

Timer.propTypes = {
  disableBtn: propTypes.func.isRequired,
  question: propTypes.number.isRequired,
  respondido: propTypes.bool.isRequired,
  atualizaTempo: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  atualizaTempo: (tempo) => dispatch(updateTimer(tempo)),
});

export default connect(null, mapDispatchToProps)(Timer);
