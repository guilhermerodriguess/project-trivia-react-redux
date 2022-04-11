import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

class Score extends React.Component {
  render() {
    const {
      name, score, picture, index,
    } = this.props;
    return (
      // <div className="ranking-score-container">
      //   <img src={ picture } alt="foto de perfil" />
      //   <p data-testid={ `player-name-${index}` }>{ name }</p>
      //   <p data-testid={ `player-score-${index}` }>{ score }</p>
      // </div>
      <Card style={ { width: '18rem' } } className="ranking-score-container">
        <Card.Img variant="top" src={ picture } alt="foto de perfil" class="picture" />
        <Card.Body>
          <Card.Title data-testid={ `player-name-${index}` }>{ name }</Card.Title>
          <Card.Text data-testid={ `player-score-${index}` }>
            { score }
          </Card.Text>
        </Card.Body>
      </Card>
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
