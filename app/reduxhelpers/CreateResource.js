import {generateAsyncAction, generateSyncAction} from "./GenerateAction";
import type { TypedFunction } from "../Utils";
import React from 'react';
import PropTypes from 'prop-types';

export class ResourceComponent extends React.Component {
    static propTypes = {
        errorView: PropTypes.func,
        dataView: PropTypes.func,
        progressView: PropTypes.func,

        onError: PropTypes.func,
        onData: PropTypes.func,
        onProgress: PropTypes.func,

        resource: PropTypes.object.isRequired
    };

    render() {
        const resource = this.props.resource;
        if (resource.loading) {
            if ("onProgress" in this.props) {
                this.props.onProgress();
            }
            if ("progressView" in this.props) {
                return this.props.progressView();
            }
        } else if(resource.result !== null) {
            if ("onData" in this.props) {
                this.props.onData(resource.result);
            }

            if ("dataView" in this.props) {
                return this.props.dataView(resource.result);
            }
        } else {
            if ("onError" in this.props) {
                this.props.onError(resource.error);
            }
            if ("errorView" in this.props) {
                return this.props.errorView();
            }
        }
    }
}

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

export function resourceInitialState(resourceTag: string) {
    return {
        [resourceTag]: {
            result: null,
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