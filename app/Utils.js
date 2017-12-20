export function repeat(n, func) {
    return function() {
        while (n--) {
            func(...arguments, n);
        }
    };
}