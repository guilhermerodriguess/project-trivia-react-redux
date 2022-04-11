import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Score from '../component/Score';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.handleRanking();
  }

  handleRanking = () => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking) {
      this.setState({
        ranking,
      });
    }
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="ranking-page">
        <h1 data-testid="ranking-title">Ranking</h1>
        <div className="players-ranking">
          {
            ranking !== undefined && ranking.length > 0
              ? ranking.map(({ name, score, picture }, index) => (
                <Score
                  key={ index }
                  name={ name }
                  score={ score }
                  picture={ picture }
                  index={ index }
                />
              ))
              : <p>Ainda não jogou</p>
          }
        </div>
        <Link to="/">
          <Button variant="primary" type="button" data-testid="btn-go-home">
            Voltar ao início
          </Button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
