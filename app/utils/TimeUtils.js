// @flow

export const SECOND  = "second";
export const MINUTE = "minute";
export const HOUR = "hour";
export const DAY = "day";

export const ONE_MINUTE_IN_SECONDS: number = 60;
export const ONE_HOUR_IN_SECONDS: number = 3600;
export const ONE_DAY_IN_SECONDS: number = 86400;

export const ONE_HOUR_IN_MINUTES: number = 60;
export const ONE_DAY_IN_MINUTES: number = 1440;

export const ONE_MONTH_IN_DAYS = 30;
export const ONE_WEEK_IN_DAYS = 7;
export const ONE_YEAR_IN_DAYS = 365;

const TimeConstants = {
    second: SECOND,
    minute: MINUTE,
    hour: HOUR,
    day: DAY
}

export type TimeUnit = $Keys<typeof TimeConstants>;

export type Interval = {
    unit: TimeUnit,
    amount: number
}

export function now() : number {
    // Date.now returns milliseconds. divide by 1000 to get seconds
    return Math.floor(Date.now() / 1000);
};

/**
 * returns a timestamp of the first iteration of the given interval toward the past
 * @param interval
 * @returns {number}
 */
export function calculateFromTime(interval: Interval): number {
    const timeSinceInSeconds = unitToSeconds(interval.amount, interval.unit);
    return timeDiff(SECOND, timeSinceInSeconds, now());
}

export function timeDiff(timeUnit: TimeUnit, fromTime: number, toTime: number): number {
    const diff = toTime - fromTime;
    return secondsToUnit(diff, timeUnit);
}

function unitToSeconds(number:number, unit: TimeUnit): number {
    switch(unit) {
        case SECOND:
            return number ;
        case MINUTE:
            return number *  ONE_MINUTE_IN_SECONDS;
        case HOUR:
            return number *  ONE_HOUR_IN_SECONDS;
        case DAY:
            return number *  ONE_DAY_IN_SECONDS;
        default:
            throw "this should never happen";
    }
}

function secondsToUnit(seconds: number, unit: TimeUnit) {
    switch(unit) {
        case SECOND:
            return seconds;
        case MINUTE:
            return seconds / ONE_MINUTE_IN_SECONDS;
        case HOUR:
            return seconds / ONE_HOUR_IN_SECONDS;
        case DAY:
            return seconds / ONE_DAY_IN_SECONDS;
        default:
            throw "TimeUtils.timediff failed. This should never happen.";
    }
}