import { combineReducers } from 'redux';
import player from './loginReducer';
import token from './triviaReducer';

const rootReducer = combineReducers({ player, token });

export default rootReducer;
