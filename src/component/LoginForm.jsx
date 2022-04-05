import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateLogin } from '../redux/actions';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
    };
  }

  onInpChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  }

  checkEmail = () => {
    const { email } = this.state;
    if (email.includes('@') && email.includes('.com')) return true;
    return false;
  }

  validateBtn = () => {
    const { nome } = this.state;
    const emailFormat = this.checkEmail();
    if (nome.length > 0 && emailFormat) {
      return false;
    }
    return true;
  }

  btnClick = (event) => {
    event.preventDefault();
    const { handleInfo } = this.props;
    handleInfo(this.state);
  }

  render() {
    const {
      nome, email,
    } = this.state;
    const disabled = this.validateBtn();
    return (
      <form>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            id="nome"
            value={ nome }
            onChange={ this.onInpChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            value={ email }
            onChange={ this.onInpChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.btnClick }
          data-testid="btn-play"
        >
          Play
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  handleInfo: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleInfo: (state) => dispatch(updateLogin(state)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
