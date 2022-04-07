import { UPDATE_LOGIN, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_LOGIN:
    return {
      ...state,
      name: action.login.nome,
      gravatarEmail: action.login.email,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
};

export default player;
