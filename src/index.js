const express = require('express')
const cors = require('cors')
const con = require('./connection/connection')
const app = express()
const PORT = process.env.PORT | 3003

app.use(express.json())
app.use(cors())


app.post('/users', (req, res)=>{
    var statusCode = 400
    try{

        const { name, whatsapp, email, message, genre, music, sports } = req.body        
        const getuser = `SELECT * FROM super_form_users WHERE email = '${email}'
            OR whatsapp = '${whatsapp}'`
        const sql = `INSERT INTO super_form_users VALUES(?,?,?,?,?,?,?,?)`
        const id = Date.now().toString(18)
        

        if(!name || !whatsapp || !email || !genre || (music.length === 2) || (sports.length === 2)){
            statusCode = 401
            throw new Error('Preencha todos os campos, somenta a mensagem é opcional')
        }        

        con.query(getuser, (error, user)=>{
            if(error){
                statusCode = 404
                throw new Error(`Usuário não encontrado: ${error}`)
            }else{
                if(user.length > 0){
                    res.status(403).send('Usuário já registrado')
                }else{
                    con.query(sql, [id, name, whatsapp, email, message, genre, music, sports], (error)=>{
                        if(error){
                            statusCode = 500
                            throw new Error(error)
                        }else{
                            res.status(201).send(`Usuário ${name} registrado(a)`)
                        }
                    })
                }
            }
        })        

    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
})


app.get('/users', (req, res)=>{
    var statusCode = 400
    try{
        
        const sql = `SELECT * FROM super_form_users`
        con.query(sql, (error, users)=>{
            if(error){
                statusCode = 404
                throw new Error(`Falha ao buscar usuários: ${error}`)
            }else{
                res.status(200).send(users)
            }
        })

    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
})


app.delete('/user/:id', (req, res)=>{
    var statusCode = 400
    try{

        const getuser = `SELECT * FROM super_form_users WHERE id = '${req.params.id}'`
        const sql = `DELETE FROM super_form_users WHERE id = '${req.params.id}'`
        
        con.query(getuser, (error, user)=>{
            if(error){
                statusCode = 404
                throw new Error(`Usuário não encontrado: ${error}`)
            }else{
                con.query(sql, (error)=>{
                    if(error){
                        statusCode = 500
                        throw new Error(error)
                    }else{
                        res.status(200).send(`${user[0].name} foi exluído`)
                    }
                })
            }
        })
    }catch(e){
        res.status(statusCode).send(e.message || e.sqlMessage)
    }
})


app.listen(PORT || 3003, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})