const con = require('./connection')
const table = 'super_form_users'

con.query(`
    CREATE TABLE ${table}(id VARCHAR(100) PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL,
    whatsapp BIGINT NOT NULL, email VARCHAR(150) NOT NULL, message TEXT, genre TEXT NOT NULL,
    music TEXT NOT NULL, sports TEXT NOT NULL);
`, (error)=>{
    if(error){
        console.log(`Failed to create table: ${error}`)
    }else{
        console.log(`${table} created successfully: `)
    }
})
