import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, email, score } = this.props;
    const convertEmail = md5(email).toString();
    return (
      <header>
        <img alt="foto" src={ `https://www.gravatar.com/avatar/${convertEmail}` } data-testid="header-profile-picture" />
        <h2 data-testid="header-player-name">
          Nome:
          {' '}
          { name }
        </h2>
        <h2 data-testid="header-score">{ `pontos: ${score}` }</h2>
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
