const express = require('express');
const fs = require('fs')
var bodyParser = require('body-parser');
const con = require('./sqlDatabase')
const router = express.Router();
const app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("api is started")
});

module.exports = app;