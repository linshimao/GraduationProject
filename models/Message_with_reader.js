var mongoose = require('mongoose');
var message_with_readerSchema = require('../schemas/message_with_readers');

module.exports = mongoose.model('Message_with_reader', message_with_readerSchema);