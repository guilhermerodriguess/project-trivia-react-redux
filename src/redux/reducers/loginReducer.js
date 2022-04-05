import { UPDATE_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
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
  default:
    return state;
  }
};

export default player;
