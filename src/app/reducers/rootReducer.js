import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import testReducer from './testReducer';
import eventReducer from '../../components/event/eventReducer';
import modalReducer from '../../components/modals/modalReducer';
import authReducer from '../../components/auth/authReducer';

const rootReducer = combineReducers({
  test: testReducer,
  events: eventReducer,
  form: FormReducer,
  modals: modalReducer,
  auth: authReducer
});

export default rootReducer;
