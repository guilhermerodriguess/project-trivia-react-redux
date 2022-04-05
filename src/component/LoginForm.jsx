import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateLogin, updateToken } from '../redux/actions';
import Loading from './Loading';

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
      loading: false,
      redirect: false,
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

  btnClick = async (event) => {
    event.preventDefault();
    const {
      handleInfo, getToken,
    } = this.props;
    handleInfo(this.state);
    this.setState({
      loading: true,
    });
    await getToken();
    this.setState({
      redirect: true,
    });
  }

  render() {
    const {
      nome, email, loading, redirect,
    } = this.state;
    const disabled = this.validateBtn();
    if (redirect) return <Redirect to="/game" />;
    if (loading) return <Loading />;
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
          type="submit"
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
  getToken: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleInfo: (state) => dispatch(updateLogin(state)),
  getToken: () => dispatch(updateToken()),
});

export default connect(null, mapDispatchToProps)(LoginForm);
