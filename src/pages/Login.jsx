import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../component/LoginForm';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  btnClick = () => {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/config" />;
    return (
      <div className="login-page">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
        <LoginForm />
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.btnClick }
        >
          Configuração
        </button>
      </div>
    );
  }
}

export default Login;
