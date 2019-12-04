class Director {
    static getLastId() {
        let sql='SELECT COUNT(Id) AS lastInsertId FROM t21';
        return sql;
    }
    static insertNewDirector() {
        let sql = 'INSERT INTO t21 SET ?';
        return sql;
    }
    static getDirectorByRank() {
        let sql = 'SELECT * FROM t21 WHERE Id=?';
        return sql;
    }
    static deleteDirectorByRank() {
        let sql = 'DELETE FROM `t21` WHERE `Id`=?';
        return sql;
    }
    static getAllDirector() {
        let sql = 'select * from t21';
        return sql;
    }
    static updateDirector() {
        let sql = 'UPDATE `t21` SET `Name`=? where `Id`=?';
        return sql;
    }
}

module.exports = Director;