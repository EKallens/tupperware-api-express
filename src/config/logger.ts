import winston, { Logger } from 'winston'

export const logger: Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'app.log' })]
})
