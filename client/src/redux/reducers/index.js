import { combineReducers } from 'redux';

import auth from './authReducer';
import token from './tokenReducer';
import salons from './salonReducer';

export default combineReducers({ auth, token, salons });
