import winston from "winston";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const level = (): string => {
    const env = process.env.NODE_ENV || "development"
    return env === "development" ? "debug" : "warn"
}

const colors = {
    error: "red",
    warn: "yellow",
    info: "green"
}

winston.addColors(colors);

// Message format
const format = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.colorize({all: true}),
    winston.format.printf(
        (info) => `${info.timestamp} - ${info.level}: ${info.message}`
    )
);

const transports = [
    new winston.transports.File({
        filename: "logs/errors.log",
        level: "error",
    }),
    new winston.transports.Console(),
];


const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports
})

export default Logger;