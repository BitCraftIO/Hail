import * as Rx from "rxjs/Rx";

export default class ViewModel<T> {
    stateSubject: Rx.Subject<T> = new Rx.Subject()

    currentState: T

    states(): Rx.Observable<T> {
        return this.stateSubject
            .asObservable()
            .startWith(this.currentState)
    }

    update(newProps) {
        this.currentState = {
            ...this.currentState,
            ...newProps
        }

        this.stateSubject.next(this.currentState)
    }
}