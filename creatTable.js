const fs = require('fs')
var bodyParser = require('body-parser');
const con = require('./sqlDatabase')
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

function creatNewTable() {
    tableMovie("t14", tableSchemaMovie)
    tableDirector("t21", tableSchemaDirector)
}

