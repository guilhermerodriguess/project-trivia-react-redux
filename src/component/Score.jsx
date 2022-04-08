import React from 'react';
import PropTypes from 'prop-types';

class Score extends React.Component {
  render() {
    const {
      name, score, picture, index,
    } = this.props;
    return (
      <div className="ranking-score-container">
        <img src={ picture } alt="foto de perfil" />
        <p data-testid={ `player-name-${index}` }>{ name }</p>
        <p data-testid={ `player-score-${index}` }>{ score }</p>
      </div>
    );
  }
}

Score.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default Score;
