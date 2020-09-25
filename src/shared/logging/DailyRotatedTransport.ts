import DailyRotateFile from 'winston-daily-rotate-file';

export const DailyRotatedTransport = new DailyRotateFile({
    dirname: './logs',
    filename: 'log-%DATE%.log',
    datePattern: 'DD.MM.YYYY',
    maxSize: '10m'
});

DailyRotatedTransport.setMaxListeners(20);
