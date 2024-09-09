const {getAge} = require('./get-age.plugin')
const {getUUID} = require('./get-id.plugin')
const {httpPlugin} = require('./http-client.plugin')

module.exports = {
    getUUID,
    getAge,
    httpPlugin
}