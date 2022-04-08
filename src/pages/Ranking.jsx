import React from 'react';
import { Link } from 'react-router-dom';
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

  compare = (a, b) => {
    const negativo = -1;
    if (a.score > b.score) return negativo;
    if (a.score < b.score) return 1;
    return 0;
  }

  handleRanking = () => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort(this.compare);
    this.setState({
      ranking,
    });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="ranking-page">
        {
          ranking.length > 0
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
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Voltar ao início
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
