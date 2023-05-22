const mysql = require('mysql')


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'alfadb',
    database: 'super_form'
})

con.connect(error=>{
    if(error){
        console.log('Failed to connect to database')
    }else{
        console.log('Connected to database')
    }
})


module.exports = con