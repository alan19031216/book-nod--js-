const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    author_name: {type: String, default: 'Ali'},
    age: {type: Number, default: '35'},
    country: {type: String, default: 'MY', maxlength: '5'}
});

// Export the model
module.exports = mongoose.model('author', authorSchema);
