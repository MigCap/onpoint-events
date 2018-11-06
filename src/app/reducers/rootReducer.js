import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import testReducer from './testReducer';
import eventReducer from '../../components/event/eventReducer';

const rootReducer = combineReducers({
  test: testReducer,
  events: eventReducer,
  form: FormReducer
});

export default rootReducer;
