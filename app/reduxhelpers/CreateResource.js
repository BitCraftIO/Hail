// @flow
import {generateAsyncAction, generateSyncAction} from "./GenerateAction";
import type { TypedFunction } from "../Utils";

export function createResourceAction (dispatch: Function, resourceName: string, resourceTag: string, asyncAction: Function): Function {
    return (...params) => {
        const [requestAction, resultAction, errorAction] = generateResourceActions(resourceName, resourceTag, dispatch);

        requestAction();

        generateAsyncAction(dispatch)(() => {
            asyncAction(...params)
                .then(result => {
                    resultAction(result);
                }, (err) => {
                    errorAction(err);
                });
        })();
    }
}

export const resourceActionCreator = (dispatch: Function) => (resourceName: string, resourceTag: string, asyncAction: TypedFunction<Promise<any>>) : Function => {
    return createResourceAction(dispatch, resourceName, resourceTag, asyncAction);
}

export const mapResourceToProps = (page: string, state: Object) => (resourceTag: string) : Object => {
    return {
        [resourceTag]: {
            result: state[page][resourceTag]["result"],
            loading: state[page][resourceTag]["loading"],
            error: state[page][resourceTag]["error"],
        }
    }
}

export const resourceInitialState = (resourceTag: string) => {
    return {
        [resourceTag]: {
            result: [],
            loading: false,
            error: null
        }
    }
}

export function createResourceReducerStates (resourceName: string, resourceTag: string) : Object {
    const [request, result, error] = generateResourceActionNames(resourceName);
    return {
        [request]: (state, action) => {
            return {
                ...state,
                [resourceTag]: {
                    ...state[resourceTag],
                    loading:true
                }
            }
        },
        [result]: (state, action) => {
            return {
                ...state,
                [resourceTag]: {
                    ...state[resourceTag],
                    loading:false,
                    result: action.result
                }
            }
        },
        [error]: (state, action) => {
            return {
                ...state,
                [resourceTag]: {
                    ...state[resourceTag],
                    loading:false,
                    error: action.error
                }
            }
        },
    }
}

function generateResourceActions(resourceName: string, resourceTag:string, dispatch: Object) : [Function, Function, Function] {
    const syncGenerator = generateSyncAction(dispatch);
    const [request, result, error] = generateResourceActionNames(resourceName);
    return [
        syncGenerator(request),
        syncGenerator(result, "result"),
        syncGenerator(error, "error")
    ];
}

function generateResourceActionNames(resourceName: string) : [string, string, string] {
    return [`${resourceName}.Request`, `${resourceName}.Result`, `${resourceName}.Error`];
}