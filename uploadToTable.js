const con = require('./sqlDatabase')
const fs = require('fs')
var bodyParser = require('body-parser');
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

function uploadJsonToTable() {
    const movieFileData = JSON.parse(fs.readFileSync('movie1.json').toString())
    const directorFileData = JSON.parse(fs.readFileSync('direct.json').toString())
    uploadMovie(movieFileData, "t14")
    uploadDirector(directorFileData, "t21")
}
