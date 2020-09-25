import { WebLogLevel } from "./WebLogLevel";


/**
 * The class implements high-level logging operations to provide easier way of data logging.
 */
export class WebLog /*extends Class*/ {
    // ---------- Fields ----------

    /**
     * Field contains class name in string form.
     */
    readonly className: string = 'Log';

    /**
     * The field contains class name for logging. This name will bee used in every log record
     * to mark the record by class name which emitted this log.
     */
    private readonly _targetClassName: string = '';

    /**
     * The color of errors. Is used only in browsers logs.
     */
    private COL_ERROR  : string = 'color: #b00';

    /**
     * The color of warnings. Is used only in browsers logs.
     */
    private COL_WARNING: string = 'color: #a70';

    /**
     * The color of info records. Is used only in browsers logs.
     */
    private COL_INFO   : string = 'color: #7a0';

    /**
     * The color of debug records. Is used only in browsers logs.
     */
    private COL_DEBUG  : string = 'color: #999';

    /**
     * The color of trace records. Is used only in browsers logs.
     */
    private COL_TRACE  : string = 'color: #666';

    /**
     * Current logging level for this instance of log.
     *
     * See [[LogLevel]] enumeration definition.
     */
    private _logLevel: WebLogLevel;

    /**
     * The internal flag of logs coloring. It is defined in runtime.
     */
    private readonly _coloring: boolean;

    /**
     * Returns current logging level.
     *
     * See [[_logLevel]] private field description.
     */
    get logLevel(): WebLogLevel {
        return this._logLevel;
    }

    /**
     * Sets log level for this instance of log.
     *
     * See [[_logLevel]] private field description.
     *
     * @param value Logging level.
     */
    set logLevel(value: WebLogLevel) {
        this._logLevel = value;
    }

    /**
     * The constructor of the log.
     * Sets logging level and also sets class name in case if it is provided.
     *
     * @param targetClassName Class name for using with this log instance.
     */
    constructor(targetClassName?: string) {
        //super();
        this._logLevel = WebLogLevel.TRACE;
        this._coloring = (typeof window === 'object' && !this.isNode());
        this._targetClassName = targetClassName || '';
    }

    /**
     * Checks that environment is Node JS.
     */
    public isNode() {
        if (typeof process === 'object') {
            if (typeof process.versions === 'object') {
                if (typeof process.versions.node !== 'undefined') {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * The method writes a record to the log console (of browser, IDE, command console).
     *
     * @param logLevel Logging level that is defined for the message.
     * @param logMessage Log message.
     */
    public log(logLevel: WebLogLevel, logMessage: any): void {
        //this.emit('log', {level: logLevel, message: logMessage});

        let logTemplate = `${this._coloring ? '%c' : ''}${'[' + WebLogLevel[logLevel] + '] '}${this._targetClassName !== '' ? '[' + this._targetClassName + ']': ''} ${logMessage}`;
        let logObject = typeof logMessage === 'object' ? logMessage : '';

        if (logLevel <= this._logLevel) {
            let color = '';
            if (this._coloring) {
                switch (logLevel) {
                    case WebLogLevel.TRACE:
                        color = this.COL_TRACE;
                        break;
                    case WebLogLevel.DEBUG:
                        color = this.COL_DEBUG;
                        break;
                    case WebLogLevel.INFO:
                        color = this.COL_INFO;
                        break;
                    case WebLogLevel.WARNING:
                        color = this.COL_WARNING;
                        break;
                    case WebLogLevel.ERROR:
                        color = this.COL_ERROR;
                        break;
                    default:
                        color = this.COL_DEBUG;
                        break;
                }
            }
            console.log(logTemplate, color, logObject);
        }
    }

    /**
     * The method writes a trace message to the log.
     *
     * @param message Trace message,
     */
    public trace(message: any): void {
        this.log(WebLogLevel.TRACE, message);
    }

    /**
     * The method writes a debug message to the log.
     *
     * @param message Debug message,
     */
    public debug(message: any): void {
        this.log(WebLogLevel.DEBUG, message);
    }

    /**
     * The method writes an info message to the log.
     *
     * @param message Info message,
     */
    public info(message: any): void {
        this.log(WebLogLevel.INFO, message);
    }

    /**
     * The method writes a warning message to the log.
     *
     * @param message Warning message,
     */
    public warning(message: any): void {
        this.log(WebLogLevel.WARNING, message);
    }

    /**
     * The method writes an error message to the log.
     *
     * @param message Error message,
     */
    public error(message: any): void {
        this.log(WebLogLevel.ERROR, message);
    }

    /**
     * THe method writes data as a table (works only in browsers).
     *
     * @param data Data to display.
     * @param logLevel Logging level.
     */
    public table(data: any, logLevel?: WebLogLevel): void {
        logLevel = logLevel || WebLogLevel.TRACE;
        if (logLevel <= this._logLevel) {
            console.table(data, [this.COL_DEBUG]);
        }
    }

    /**
     * Log factory method. Returns new log instance for using with appropriate class.
     *
     * @param className Class name
     */
    public static getClassLog(className: string): WebLog {
        return new WebLog(className);
    }
}

/**
 * The constant defines common log instance.
 */
export const WebLogger: WebLog = new WebLog();
