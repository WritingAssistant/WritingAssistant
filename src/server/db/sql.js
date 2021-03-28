var Mysql = {
    user: {
        add: 'insert into login (username, email,password) values (?,?,?)',
        select: 'select * from login'
    },
    rank:{
        select:"select rankname from rank"
    }
}

module.exports = Mysql;