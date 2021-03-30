var Mysql = {
    user: {
        add: 'insert into login (username, email,password) values (?,?,?)',
        select: 'select * from login'
    },
 
    topic:{
        select:"select * from topic"
    },
    paras:{
        add:'insert into paras (topic_id, selectIndexes, content, author, time) values (?,?,?,?,?)' ,
        select:'select * from paras',
        change:'update paras set content = '

    }
}

module.exports = Mysql;