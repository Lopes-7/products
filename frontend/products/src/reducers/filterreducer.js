/**
 * CONSTANTS
 */
const INITIAL_STATE = {
    alert: false,
    critical: false,
    ok: false,
};

/**
 * CODE
 */

// reducer for filters state
function filterReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'TOGGLE_FILTER_ALERT':
            return {...state, alert: !state.alert};

        case 'TOGGLE_FILTER_CRITICAL':
            return {...state, critical: !state.critical};

        case 'TOGGLE_FILTER_OK':
            return {...state, ok: !state.ok};

        default:
            return state;
    }
}

/**
 * EXPORTS
 */
export {filterReducer};
