import { UPDATE_LOGIN } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_LOGIN:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.login.nome,
        gravatarEmail: action.login.email,
      },
    };
  default:
    return state;
  }
};

export default loginReducer;
