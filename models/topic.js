const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean
    }
})

module.exports = mongoose.model('Topic', topicSchema)