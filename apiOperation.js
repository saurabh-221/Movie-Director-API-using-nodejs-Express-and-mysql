const con = require('./sqlDatabase')
const app = require('./expressFile')
const Movie = require('./product')
const Director = require('./directors')

app.get('/api/movies', function (req, res) {
    con.query(Movie.getAllMovie(), function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.get('/api/movies/:Rank', function (req, res) {
    con.query(Movie.getMovieByRank(), [req.params.Rank], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.post('/api/movies', function (req, res) {
    var postData = req.body;
    var newRank;
    con.query(Movie.getLastId(), function (error, result, fields) {
        if (error) throw error;
        newRank = result[0].lastInsertId + 1;
        var newData = { "Rank": newRank }
        Object.assign(newData, postData)
        con.query(Movie.insertNewMovie(), newData, function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    })
});

app.put('/api/movies/:Rank', function (req, res) {
    const rankId = req.params;
    let updateString = '';
    Object.keys(req.body).forEach((field) => {
        updateString += `${field} = '${req.body[field]}',`;
    });
    updateString = updateString.slice(0, updateString.length - 1);
    const updateQuery = `UPDATE t14 SET ${updateString} WHERE Rank = ?`;

    con.query(updateQuery, [Number(rankId.Rank)], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.delete('/api/movies/:Rank', function (req, res) {
    con.query(Movie.deleteMovieByRank(), [req.body.Rank], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
    });
});

app.get('/api/directors', function (req, res) {
    con.query(Director.getAllDirector(), function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.get('/api/directors/:Id', function (req, res) {
    con.query(Director.getDirectorByRank(), [req.params.Id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.post('/api/directors', function (req, res) {
    var postData = req.body;
    var newId;
    con.query(Director.getLastId(), function (error, result, fields) {
        if (error) throw error;
        newId = result[0].lastInsertId + 1;
        var newData = { "Id": newId }
        Object.assign(newData, postData)
        con.query(Director.insertNewDirector(), newData, function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
    })
});

app.put('/api/directors/:Id', function (req, res) {
    con.query(Director.updateDirector(), [req.body.Name, req.params.Id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.delete('/api/directors/:Id', function (req, res) {
    con.query(Director.deleteDirectorByRank(), [req.body.Id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
    });
});


