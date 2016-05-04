'use strict';

const post = require('./post.js');
const get = require('./get.js');
const del = require('./delete.js');
const patch = require('./patch.js');

module.exports = {
    create: post,
    find: get,
    del: del,
    update: patch
};
