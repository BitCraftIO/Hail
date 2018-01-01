// @flow
// functional version of an iterative for loop
export function repeat(n: number, func: Function) : Function {
    return function() {
        while (n--) {
            func(...arguments, n);
        }
    };
}

// to enforce having a function that returns a specific value
export type TypedFunction<T> = <T> (args: any) => T;

// to avoid null check when calling a function
export function callIfNotNull(func: Function, ...args: any) {
    return func ? func(...args) : null;
}