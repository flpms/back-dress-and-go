'use strict';

const create = require('./create.js');
const find = require('./find.js');
const update = require('./update.js');
const del = require('./delete.js');
const config = require('../../config/data.json');

module.exports = {
    create(rent) {
        return create.call({context: this, config: config.db[global.environment]}, rent);
    },
    find(rent) {
        return find.call({context: this, config: config.db[global.environment]}, rent);
    },
    update(id, rent) {
        return update.call({context: this, config: config.db[global.environment]}, id, rent);
    },
    del(rent) {
        return del.call({context: this, config: config.db[global.environment]}, rent);
    }
};
