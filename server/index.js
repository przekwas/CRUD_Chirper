const express = require('express');
const cors = require('cors')
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3305',
    password: '1234',
    database: 'crud_db'
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/get', (req,res) => {
    const sqlSelect = "SELECT * FROM user_statuses";
    db.query(sqlSelect, (err,result) => {
        if (err) {
            return res.status(500).json({ message: 'fuck' });
        }
        
        res.json(result);
    });
})

app.post('/api/insert',(req,res)=> {
   const newUser = req.body;
    
    delete newUser.poop;

    const sqlInsert = "INSERT INTO user_statuses SET ?";
    
    db.query(sqlInsert, newUser, (err,result) => {
         if (err) {
            return res.status(500).json({ message: 'fuck' });
        }
        
        res.json(result);
    });
});

app.delete('/api/delete/:userName', (req,res)=> {
    const name = req.params.userName
    const sqlDelete = "DELETE FROM user_statuses WHERE userName = ?";  
    
    db.query(sqlDelete, name, (err,result) => {
        if (err) {
            return res.status(500).json({ message: 'fuck' });
        }
        
        res.json(result);
    })
})

app.put('/api/update/:userName', (req,res)=> {
    const name = req.params.userName;
    const status = req.body.userStatus;
    const sqlUpdate =
    "UPDATE user_statuses SET userStatus = ? WHERE userName = ?";  
    
    db.query(sqlUpdate, [status,name], (err,result) => {
         if (err) {
            return res.status(500).json({ message: 'fuck' });
        }
        
        res.json(result);
    })
})

app.listen(3001,() => {
    console.log('running on port 3001')
});
