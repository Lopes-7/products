/**
 * CODE
 */

// action creator for toggle filter alert action
function toggleFilterAlert() {
    return {type: 'TOGGLE_FILTER_ALERT'};
}

// action creator for toggle filter critical action
function toggleFilterCritical() {
    return {type: 'TOGGLE_FILTER_CRITICAL'};
}

// action creator for toggle filter ok action
function toggleFilterOk() {
    return {type: 'TOGGLE_FILTER_OK'};
}

/**
 * EXPORTS
 */
export {toggleFilterAlert, toggleFilterCritical, toggleFilterOk};
