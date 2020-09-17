/**
 * CONSTANTS
 */
const INITIAL_STATE = {
    update: false,
};

/**
 * CODE
 */

// reducer for data state
function dataReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE':
            return {...state, update: true};

        case 'UPDATED':
            return {...state, update: false};

        default:
            return state;
    }
}

/**
 * EXPORTS
 */
export {dataReducer};
