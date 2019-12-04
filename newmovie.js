var mysql = require('mysql');
const fs = require('fs')
var bodyParser = require('body-parser');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Jain@123",
    database: "mysql"
});
const _ = require('underscore')

const pkey = { primaryKey: false }
let primaryCol = null;

// ----------------------------------------------------------------------------------------------------------
const express = require('express');
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
// ------------------------------------------------------------------------------------------------------------

tableSchemaMovie = {
    Rank: { primaryKey: false, type: "INT" }, Title: { primaryKey: false, type: "TEXT" }, Description: { primaryKey: false, type: "TEXT" }, Runtime: { primaryKey: false, type: "INT" },
    Genre: { primaryKey: false, type: "TEXT" }, Rating: { primaryKey: false, type: "DECIMAL" }, Metascore: { primaryKey: false, type: "INT" }, Votes: { primaryKey: false, type: "INT" },
    Gross_Earning_in_Mil: { primaryKey: false, type: "DECIMAL" }, Director_Id: { primaryKey: true, type: "INT" }, Actor: { primaryKey: false, type: "TEXT" }, Year: { primaryKey: false, type: "INT" }
}

tableSchemaDirector = { Id: { type: "INT" }, Name: { type: "TEXT" } };

const tableMovie = (tableName, tableSchemaMovie) => {
    let tableString = '';
    const tabledefault = { ...tableSchemaMovie };
    Object.keys(tableSchemaMovie).forEach((col) => {
        tableString += `${col} ${tableSchemaMovie[col].type},`;
    });
    tableString = tableString.slice(0, tableString.length - 1);
    console.log(tableString)
    con.connect(function (err) {
        if (err) throw err;
        con.query(
            `CREATE TABLE ${tableName} (${tableString});`, (error, result) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(result);
                }
            }
        )
    });
}


const tableDirector = (tableName, tableSchemaDirector) => {
    let tableString = '';
    const tabledefault = { ...tableSchemaDirector };
    Object.keys(tableSchemaDirector).forEach((col) => {
        tableString += `${col} ${tableSchemaDirector[col].type},`;
    });
    tableString = tableString.slice(0, tableString.length - 1);
    con.connect(function (err) {
        if (err) throw err;
        con.query(
            `CREATE TABLE ${tableName} (${tableString});`, (error, result) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(result);
                }
            }
        )
    });
}



const uploadMovie = (jsonFile, tableName) => {
    const values = []
    let string1 = '';
    Object.keys(jsonFile[0]).forEach((field) => {
        string1 += `${field},`;
    }
    );
    string1 = string1.slice(0, string1.length - 1);
    jsonFile.forEach((record) => {
        const recValues = []
        Object.keys(record).forEach((field) => {
            recValues.push(record[field]);
        });
        values.push(recValues);
    })
    con.query(`INSERT INTO ${tableName}(${string1}) VALUES ?;`, [values], (error, results) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(results);
        }
    }
    )
}


const uploadDirector = (jsonFile, tableName) => {
    const values = []
    let string1 = '';
    Object.keys(jsonFile[0]).forEach((field) => {
        string1 += `${field},`;
    }
    );
    string1 = string1.slice(0, string1.length - 1);
    jsonFile.forEach((record) => {
        const recValues = []
        Object.keys(record).forEach((field) => {
            recValues.push(record[field]);
        });
        values.push(recValues);
    })
    con.query(`INSERT INTO ${tableName}(${string1}) VALUES ?;`, [values], (error, results) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(results);
        }
    }
    )
}


function creatNewTable() {
    tableMovie("t14", tableSchemaMovie)
    tableDirector("t21", tableSchemaDirector)
}


function uploadJsonToTable() {
    const movieFileData = JSON.parse(fs.readFileSync('movie1.json').toString())
    const directorFileData = JSON.parse(fs.readFileSync('direct.json').toString())
    uploadMovie(movieFileData, "t14")
    uploadDirector(directorFileData, "t21")
}


function getMovie() {
    //rest api to get all results
    app.get('/api/movies', function (req, res) {
        con.query('select * from t14', function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    });
}

function getSingleMovie() {
    //rest api to get a single data
    app.get('/api/movies/:Rank', function (req, res) {
        console.log(req);
        con.query('SELECT * FROM t14 WHERE Rank=?', [req.params.Rank], function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    });
}

function insertMovie() {
    app.post('/api/movies/add', function (req, res) {
        var postData = req.body;
        con.query('INSERT INTO t14 SET ?', postData, function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    });
}


function updateMovie() {
    //rest api to update record into mysql database
    app.put('/api/movies/update', function (req, res) {
        con.query('UPDATE `t14` SET `Title`=?,`Runtime`=? where `Rank`=?', [req.body.Title, req.body.Runtime, req.body.Rank], function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    });
}


function deleteMovie() {
    //rest api to delete record from mysql database
    app.delete('/api/movies/delete', function (req, res) {
        console.log(req.body);
        con.query('DELETE FROM `t14` WHERE `Rank`=?', [req.body.Rank], function (error, results, fields) {
            if (error) throw error;
            res.end('Record has been deleted!');
        });
    });
}




function getDirector() {
    //rest api to get all results
    app.get('/api/director', function (req, res) {
        con.query('select * from t21', function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    });
}

function getSingleDirector() {
    //rest api to get a single data
    app.get('/api/director/:Id', function (req, res) {
        console.log(req);
        con.query('SELECT * FROM t21 WHERE Id=?', [req.params.Id], function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    });
}

function insertDirector() {
    app.post('/api/director/add', function (req, res) {
        var postData = req.body;
        con.query('INSERT INTO t21 SET ?', postData, function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    });
}


function updateDirector() {
    //rest api to update record into mysql database
    app.put('/api/director/update', function (req, res) {
        con.query('UPDATE `t21` SET `Name`=? where `Id`=?', [req.body.Name, req.body.Id], function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    });
}


function deleteDirector() {
    //rest api to delete record from mysql database
    app.delete('/api/director/delete', function (req, res) {
        console.log(req.body);
        con.query('DELETE FROM `t21` WHERE `Id`=?', [req.body.Id], function (error, results, fields) {
            if (error) throw error;
            res.end('Record has been deleted!');
        });
    });
}



// creatNewTable()
// uploadJsonToTable()

getMovie()
getSingleMovie()
insertMovie()
updateMovie()
deleteMovie()

getDirector()
getSingleDirector()
insertDirector()
updateDirector()
deleteDirector()