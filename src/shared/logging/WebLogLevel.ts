/**
 * The enumeration defines logging levels.
 */
export enum WebLogLevel {
    /**
     * This logging level prevents writing logs at all.
     */
    OFF = 0,

    /**
     * Allows write only error messages into the log.
     */
    ERROR = 1,

    /**
     * Allows write error and warning messages into the log.
     */
    WARNING = 2,

    /**
     * Allows write error, warning and information messages into the log.
     */
    INFO = 3,

    /**
     * Turns on writing of all types of messages but trace.
     */
    DEBUG = 4,

    /**
     * All types of messages will be included into the log.
     */
    TRACE = 5
}