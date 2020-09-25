import { format } from 'winston';
const { printf } = format;

export const LogFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level}] [${label}]: ${message}`;
});