import { UPDATE_ASSERTIONS, UPDATE_LOGIN, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
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
  case UPDATE_ASSERTIONS:
    return {
      ...state,
      assertions: action.assertions + state.assertions,
    };
  default:
    return state;
  }
};

export default player;
