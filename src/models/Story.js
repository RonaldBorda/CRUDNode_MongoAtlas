const {Schema, model} = require('mongoose');

const StorySchema = new Schema({
    title: {type: String, require: true},
    site: {type: String, require: true},
    description: {type: String, require: true}
}, { timestamps: true })

module.exports = model('Story', StorySchema);