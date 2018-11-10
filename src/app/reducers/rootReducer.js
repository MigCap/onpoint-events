import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import testReducer from '../../components/testing/testReducer';
import eventReducer from '../../components/event/eventReducer';
import modalReducer from '../../components/modals/modalReducer';
import authReducer from '../../components/auth/authReducer';
import asyncReducer from '../../components/async/asyncReducer';

const rootReducer = combineReducers({
  test: testReducer,
  events: eventReducer,
  form: FormReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer
});

export default rootReducer;
