const client = require('./connection.js')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors());



app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

client.connect();

//gets all the users from users table

app.get('/users', (req, res)=>{
    client.query(`Select * from dinder_users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            res.status(500).send(`${err.message}`);
        }
    });
    client.end;
})


//get the result for a single user from users table

app.get('/users/:wallet_address', (req, res)=>{
    console.log("this is how request looks like ",req.params)
    client.query(`Select * from dinder_users where wallet_address='${req.params.wallet_address}'`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            res.status(500).send(`this is the error issue ${err.message}`);
        }
    });
    client.end;
})


// gets  the likes of a particular user using there user id 

app.get('/users/likes', (req, res)=>{
    client.query(`Select like_id  from dinder_users_like where user_id=${req.query.id} `, (err, result)=>{
        if(!err){
            
            res.send(result.rows);
        }
        else{
            res.status(500).send(`${err.message}`)
        }
    });
    client.end;
})





//post the user 
app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `INSERT INTO dinder_users(username,wallet_address,email,school,city,country,image_url,age) VALUES ('${user.username}','${user.wallet_address}','${user.email}','${user.school}','${user.city}','${user.country}','${user.image_url}','${user.age}') RETURNING id;`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            console.log(result?.rows[0]);
            res.status(200).send(`Insertion was successful , ${result?.rows[0] }`);
    

        }
        else{ 
            res.status(500).send(`Insertion was unsuccessful, ${err.message}`);
        }
    })
    client.end;
})

//post user likes 

app.post('/users/likes', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into dinder_users_like(user_id, like_id) values (${user.user_id},${user.like_id});`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.status(200).send(`Insertion was successful , ${result }`);
        }
        else{ 
            res.status(500).send(`Insertion was unsuccessful, ${err.message}`);
        }
    })
    client.end;
})

// app.delete('/users/:id',async (req,res) =>{

//    await client.query(`delete from dinder_users_like where user_id=${req.params.id} or like_id=${req.params.id} `, (err, result)=>{
//         if(err){
//             res.status(500).send(`Deletion was unsuccessful, ${err.message}`);
//         }

//     });

//     await client.query(`delete from dinder_users where id=${req.params.id} `, (err, result)=>{
//         if(!err){
//             res.send(result.rows);
//         }
//     });


// } )

