import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
    const convertEmail = md5(email).toString();
    return (
      <header id="header-game">
        <img className="foto-perfil" alt="foto" src={ `https://www.gravatar.com/avatar/${convertEmail}` } data-testid="header-profile-picture" />
        <div>
          <h2 data-testid="header-player-name">
            { name }
          </h2>
        </div>
        <div>
          Pontuação Atual:
          <h2 data-testid="header-score">{ score }</h2>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
