const Book = require('../../models/book.models');
const Author = require('../../models/author.models');
const db = require('../../config/config');
const express = require('express');
const { sign } = require('jsonwebtoken');
const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');

const authenticateRoute = require("../API/authenticate");

const router = express.Router();

// a simple test url to check that all of our files are communicating correctly.
// read
router.get('/', function (req, res) {
    /*Book.aggregate([
        { $lookup:
           {
             from: 'author',
             localField: 'author_id',
             foreignField: '_id',
             as: 'orderdetails'
           }
         }
        ]).toArray(function(err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res));
        db.close();
      });*/
    Book.find({}).map("author_id"), (err, result) => {
        if (result)
            res.send(result);
    };
    //res.send("Hello");
});

// insert book
router.post('/addBook', function (req, res) {
    let book = new Book(
        {
            name: req.body.name,
            price: req.body.price,
            publish: req.body.publish,
            publish_date: req.body.publish_date,
            total_page: req.body.total_page,
            author_id: req.body.author_id
        }
    );

    book.save(function (err, result) {
        if (err) {
            throw (err);
        }
        console.log("Book");
        // console.log(result);

        res.send('Add book successfully')
        let author = new Author(
            {
                _id: req.body._id,
                author_name: req.body.author_name,
                age: req.body.age,
                country: req.body.country
            }
        );

        author.save(function (err, result) {
            if (err) {
                throw (err);
            }
            console.log("Author");
            // console.log(result);

            // res.send('Add author successfully');
        });
    });


});

router.put('/updateBook/:id', function (req, res) {
    Book.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, function (err, product) {
        if (err) {
            throw (err);
        }
        console.log(req.params.id);

        res.send('Product udpated.');
    });
});

// delete
router.delete('/deleteBook/:id', function (req, res) {
    Book.findOneAndDelete(req.params.id, function (err) {
        if (err) {
            throw (err);
        }
        res.send('Deleted successfully!');
    });
});

router.post('/login', (req, res) => {
    var json={
        username: "alan",
        password:"abc"
    };
    return res.json(token(json));
})

router.get('/api/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    // return user info
    res.json({ user: req.user });
});

router.get('/api/profile/1', authenticateRoute, (req, res) => {
    // return user info
    console.log("2")
    res.json({ user: req.user.username });
});

function token(json) {
    const secret = 'mySecretKey';
    if (!json.username || !json.username)
        return null
    // here you would normally fetch the user from your database
    const token = sign ({ username: json.username }, secret, { expiresIn: 500 });
    return token;
}

module.exports = router;