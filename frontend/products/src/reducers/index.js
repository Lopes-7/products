/**
 * IMPORTS
 */
import {combineReducers} from 'redux';
import {filterReducer as filters} from './filterreducer';
import {dataReducer as data} from './datareducer';

/**
 * CODE
 */
const reducers = combineReducers({
    data,
    filters,
});

/**
 * EXPORTS
 */
export {reducers};
