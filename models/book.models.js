const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String, 
        default: 'book of ABC'
    },
    price: {type: Number, default: '100'},
    publish: {type: String, default: 'abc'},
    publish_date: {type: Date, default: '2019-04-02'},
    total_page: {type: Number, default: '200'},
    // author_id: {type: ObjectId, ref: "author"}
});

// Export the model
module.exports = Book = mongoose.model('book', bookSchema);
