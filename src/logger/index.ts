const logger = require("pino")({
    level:"debug",
    prettyPrint: {
        levelFirst: true,
        colorize: true,
    },
})


export { logger };