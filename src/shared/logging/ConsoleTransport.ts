import { format, transports } from 'winston';
import { LogFormat } from "./LogFormat";
const { combine, colorize } = format;

export const ConsoleTransport = new transports.Console({
    format: combine(
        colorize(),
        LogFormat
    )
});