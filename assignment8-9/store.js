import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import jobsReducer from './reducers/jobsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  jobs: jobsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;