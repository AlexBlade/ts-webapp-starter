export class DateTimeUtilities {

    /**
     * Returns current timestamp with accuracy up to a hour.
     */
    public static getCurrentTimeStamp() {
        const now = new Date();
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);
        return now;
    }

    /**
     * Returns date with accuracy up to a hour.
     */
    public static getDateTimeUpToHour(dateTime: Date) {
        const result = new Date(dateTime);
        result.setMinutes(0);
        result.setSeconds(0);
        result.setMilliseconds(0);
        return result;
    }

    /**
     * Converts Unix timestamp to Date
     * @param unixTimeStamp number of seconds since 01.01.1970 00:00:00
     */
    public static dateTimeFromUnixTimeStamp(unixTimeStamp: number) {
        return new Date(unixTimeStamp * 1000);
    }
}