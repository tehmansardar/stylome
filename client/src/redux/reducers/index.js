import { combineReducers } from 'redux';

import auth from './authReducer';
import token from './tokenReducer';
import salons from './salonReducer';
import visit from './visitReducer';

export default combineReducers({ auth, token, salons, visit });
