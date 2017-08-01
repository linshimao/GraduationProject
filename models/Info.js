/**
 * Created by small on 2017/7/28.
 */
var mongoose = require('mongoose');
var infoSchema = require('../schemas/Infos');
module.exports = mongoose.model('Info', infoSchema);