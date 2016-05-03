'use strict';

const create = require('./create.js');
const find = require('./find.js');
const update = require('./update.js');
const del = require('./delete.js');
const config = require('../../config/data.json');

module.exports = {
    create(dress) {
        return create.call({context: this, config: config.db[global.environment]}, dress);
    },
    find(dress) {
        return find.call({context: this, config: config.db[global.environment]}, dress);
    },
    update(id, dress) {
        return update.call({context: this, config: config.db[global.environment]}, id, dress);
    },
    del(dress) {
        return del.call({context: this, config: config.db[global.environment]}, dress);
    }
};
