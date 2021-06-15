const express = require('express');
const bodyParser = require ('body-parser')
const app = express();
const cors = require('cors')
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3305',
    password: '1234',
    database: 'crud_db'
})

app.use(cors()); //error handler (I think)
app.use(bodyParser.urlencoded({extended: true})) // auto JSON
app.use(express.json())

app.get('/api/get', (req,res) => {
    const sqlSelect = "SELECT * FROM user_statuses";
    db.query(sqlSelect, (err,result)=>{
        
        res.send(result);
        
        //test
        // console.log(result);
    })
})

app.post('/api/insert',(req,res)=> {
    const userName = req.body.userName
    const userStatus= req.body.userStatus

    const sqlInsert = "INSERT INTO user_statuses (userName, userStatus) VALUES (?,?)";
    db.query(sqlInsert,[userName, userStatus],(err,result)=> {
        console.log(result);
    })
});

// app.get('/',(req,res)=>{    
//      // test ---
//      const sqlInsert = "INSERT INTO user_statuses (userName, userStatus) VALUES ('inception','7/10');"
//      db.query(sqlInsert, (err,result)=>{
//          res.send("hello world");
//      })
// })

app.delete('/api/delete/:userName', (req,res)=> {
    const name = req.params.userName
    const sqlDelete =
    "DELETE INTO user_statuses WHERE userName = ?";  
    
    db.query(sqlDelete, name, (err,result) => {
        if (err) console.log(err)
    })
})

app.put('/api/update/:userName', (req,res)=> {
    const name = req.body.userName
    const status = req.body.userStatus
    const sqlUpdate =
    "UPDATE user_statuses SET userStatus = ? WHERE userName = ?";  
    
    db.query(sqlUpdate, [status,name], (err,result) => {
        if (err) console.log(err)
    })
})

app.listen(3001,() => {
    console.log('running on port 3001')
});