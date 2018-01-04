// @flow

export const SECOND  = "second";
export const MINUTE = "minute";
export const HOUR = "hour";
export const DAY = "day";

export const ONE_MINUTE_IN_SECONDS: number = 60;
export const ONE_HOUR_IN_SECONDS: number = 3600;
export const ONE_DAY_IN_SECONDS: number = 86400;
export const ONE_MONTH_IN_SECONDS: number = 2592000;
export const ONE_YEAR_IN_SECONDS: number = 31536000;

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

export function timeSinceString(sinceTimestamp: number | Date) {
    let intervals = [
        { label: 'year', seconds: ONE_YEAR_IN_SECONDS },
        { label: 'month', seconds: ONE_MONTH_IN_SECONDS },
        { label: 'day', seconds: ONE_DAY_IN_SECONDS },
        { label: 'hour', seconds: ONE_HOUR_IN_SECONDS },
        { label: 'minute', seconds: ONE_MINUTE_IN_SECONDS },
        { label: 'second', seconds: 0 }
    ];

    if (typeof sinceTimestamp !== "number") {
        sinceTimestamp = sinceTimestamp.getTime();
    }
    const seconds = now() - sinceTimestamp;
    const interval = intervals.find(i => i.seconds < seconds);
    const count = Math.floor(seconds / interval.seconds);
    return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
}

export function timeDiff(timeUnit: TimeUnit, fromTime: number, toTime: number): number {
    const diff = toTime - fromTime;
    return secondsToUnit(diff, timeUnit);
}

export function timeFromDateString(date:string) {
    return Math.floor(new Date(date).getTime() / 1000);
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