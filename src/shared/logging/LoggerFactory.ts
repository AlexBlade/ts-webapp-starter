import winston, { createLogger, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { ConsoleTransport } from "./ConsoleTransport";
import { DailyRotatedTransport } from "./DailyRotatedTransport";
import { LogFormat } from "./LogFormat";

const { combine, label, timestamp } = format;

export class LoggerFactory {
    private static defaultLoggerName = 'log';

    private static loggers: { [key: string]: winston.Logger } = {};

    private setDefaultLoggerName(name: string): void {
        LoggerFactory.defaultLoggerName = name;
    }

    public static getLogger(loggerName: string, fileName?: string) {
        return LoggerFactory.loggers[loggerName + (fileName ? '-' + fileName : '')] ?? LoggerFactory.createNewLogger(loggerName, fileName);
    }

    public static getDefaultLogger() {
        return LoggerFactory.getLogger(LoggerFactory.defaultLoggerName);
    }

    private static createNewLogger(loggerName: string, fileName?: string, dirName?: string) {
        let fileTransport: DailyRotateFile;
        if (fileName) {
            fileTransport = new DailyRotateFile({
                dirname: dirName ?? './logs',
                filename: fileName + '-%DATE%.log',
                datePattern: 'DD.MM.YYYY',
                maxSize: '10m'
            });
        } else {
            fileTransport = DailyRotatedTransport;
        }

        const logger = createLogger({
            format: combine(
                label({ label: loggerName }),
                timestamp({
                    format: 'HH:mm:ss.SSS'
                }),
                LogFormat
            ),
            transports: [fileTransport, ConsoleTransport],
            level: 'silly'
        });

        LoggerFactory.loggers[loggerName] = logger;

        return logger;
    }
}