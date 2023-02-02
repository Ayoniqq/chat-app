const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatmsgSchema = new Schema({
    name: String,
    message: String
})

const Chat = mongoose.model('Chat', chatmsgSchema);

module.exports = Chat;