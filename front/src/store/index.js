import {createStore}  from 'redux';
import rootReducer from './rootReducer';
import thunkMiddleware from 'react-redux' 
let store = createStore(rootReducer);
export default store;