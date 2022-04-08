import { UPDATE_TIME } from '../actions';

const INITIAL_TIME = 30;

const time = (state = INITIAL_TIME, action) => {
  switch (action.type) {
  case UPDATE_TIME:
    return action.time;
  default:
    return state;
  }
};

export default time;
