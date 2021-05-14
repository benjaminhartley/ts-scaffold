import log4js from 'log4js';

const log = log4js.getLogger();
log.level = process.env.LOG_LEVEL || 'INFO';

export default log;
