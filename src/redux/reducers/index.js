import { combineReducers } from 'redux';
import player from './loginReducer';
import token from './triviaReducer';
import time from './timeReducer';

const rootReducer = combineReducers({ player, token, time });

export default rootReducer;
