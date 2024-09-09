const {buildLogger} = require('./plugins')

const logger = buildLogger('app.js');

logger.log('hello world!')
logger.error('Oh! Something bad happened')


