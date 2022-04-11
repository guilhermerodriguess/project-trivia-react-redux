import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import LoginForm from '../component/LoginForm';
import { resetScore } from '../redux/actions';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    const { clearScore } = this.props;
    clearScore();
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
          <div>
            <LoginForm />
            <Button
              variant="light"
              type="button"
              data-testid="btn-settings"
              onClick={ this.btnClick }
            >
              Configuração
            </Button>
          </div>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  clearScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  clearScore: () => dispatch(resetScore()),
});

export default connect(null, mapDispatchToProps)(Login);
