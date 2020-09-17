/**
 * IMPORTS
 */
import {combineReducers} from 'redux';
import {filterReducer as filters} from './filterreducer';

/**
 * CODE
 */
const reducers = combineReducers({
    filters,
});

/**
 * EXPORTS
 */
export {reducers};
