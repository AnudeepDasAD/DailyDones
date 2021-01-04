var express = require('express');
var router = express.Router();

var indexRouter = require('./index');
var usersRouter = require('./users');
var testRouter = require('./test');


router.get('/', (req,res,next) => {
    res.send("Index page is working");
});
router.get('/users', (req,res,next) => {
    res.send("USers page is working");
});

router.get('/test', (req,res,next) => {
        res.send("Test page is working");
});

module.exports = router;