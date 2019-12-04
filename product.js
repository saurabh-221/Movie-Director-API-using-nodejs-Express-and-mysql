class Movie {
    static getLastId() {
        let sql='SELECT COUNT(Rank) AS lastInsertId FROM t14';
        return sql;
    }
    static insertNewMovie() {
        let sql = 'INSERT INTO t14 SET ?';
        return sql;
    }
    static getMovieByRank() {
        let sql = 'SELECT * FROM t14 WHERE Rank=?';
        return sql;
    }
    static deleteMovieByRank() {
        let sql = 'DELETE FROM `t14` WHERE `Rank`=?';
        return sql;
    }
    static getAllMovie() {
        let sql = 'select * from t14';
        return sql;
    }
    static updateMovie() {
        let sql = 'UPDATE `t14` SET `Title`=?,`Runtime`=? where `Rank`=?';
        return sql;
    }
}

module.exports = Movie;