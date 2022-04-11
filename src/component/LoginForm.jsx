import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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
      <form id="email-password">
        <label htmlFor="nome">
          <input
            type="text"
            id="nome"
            value={ nome }
            onChange={ this.onInpChange }
            placeholder="Nome"
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            value={ email }
            onChange={ this.onInpChange }
            placeholder="Email"
            data-testid="input-gravatar-email"
          />
        </label>
        <Button
          type="submit"
          disabled={ disabled }
          onClick={ this.btnClick }
          data-testid="btn-play"
        >
          Play
        </Button>
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
