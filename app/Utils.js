
// functional version of an iterative for loop
export function repeat(n, func) {
    return function() {
        while (n--) {
            func(...arguments, n);
        }
    };
}

// to enforce having a function that returns a specific value
export type TypedFunction<T> = <T> (args: any) => T;