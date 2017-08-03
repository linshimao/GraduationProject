var mongoose = require('mongoose');
var personal_informationSchema = require('../schemas/personal_informations');

module.exports = mongoose.model('Personal_information', personal_informationSchema);