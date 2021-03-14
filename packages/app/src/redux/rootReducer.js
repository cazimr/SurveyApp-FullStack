import {combineReducers} from 'redux';
import adminReducer from './admin/adminReducer';
import candidatesReducer from './candidates/candidatesReducer';


const rootReducer = combineReducers({
    admin: adminReducer,
    candidates: candidatesReducer
  
});

export default rootReducer;