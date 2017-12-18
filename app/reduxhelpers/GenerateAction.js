export const generateSyncAction = (dispatch) => (type, ...argNames) => {
    return function (...args) {
        let action = {type}
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return dispatch(action);
    }
}

export const generateAsyncAction = (dispatch) => (func) => (...args) => {
    dispatch((unusedDispatch) => {
        func(...args);
    });
}