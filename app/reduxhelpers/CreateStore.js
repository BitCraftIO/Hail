import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger  from 'redux-logger'
import rootReducer from './RootReducer'


const loggerMiddleware = createLogger();

export default function store() {
    return createStore(
        rootReducer,
        applyMiddleware(
            thunk,
            loggerMiddleware
        )
    )
}