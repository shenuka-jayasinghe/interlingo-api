const mongoose = require('mongoose');

const User = mongoose.model('Data', {
    generatedText: { type: String },
    translation: { type: String },
    audio: { type: String }
});

module.exports = {User};