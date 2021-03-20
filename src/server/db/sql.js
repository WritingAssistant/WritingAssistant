var Mysql = {
    user: {
        add: 'insert into login (username, email,password) values (?,?,?)',
        select: 'select * from login'
    }
}

module.exports = Mysql;