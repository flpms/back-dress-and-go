'use strict';

const create = require('./create.js');
const find = require('./find.js');
const update = require('./update.js');
const del = require('./delete.js');
const config = require('../../config/data.json');

module.exports = {
    create(client) {
        return create.call({context: this, config: config.db[global.environment]}, client);
    },
    find(client) {
        return find.call({context: this, config: config.db[global.environment]}, client);
    },
    update(client) {
        return update.call({context: this, config: config.db[global.environment]}, client);
    },
    del(client) {
        return del.call({context: this, config: config.db[global.environment]}, client);
    }
}
