const express = require ('express');
const Database = require ('./mysqlcon');
const cors =require('cors')
const app = express();
const port = 3001;
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('SUPERMARKET!!');
})
app.get('/usuarios', (req, res)=>
{ 
    const db= new Database()
    const cn=db.getConnection()
    cn.execute(
        'SELECT * FROM usuarios', [],
        function(err, results, fields) {      
          res.json(results)      
        }
      );   
 
})
app.post('/usuarios', (req, res) => {

    const body = req.body;
    const db = new Database()
    const cn = db.getConnection()
    const query = `INSERT INTO supermarket
                (id,username,password,status) values
                 (?,?,?,?,?)`
    
    
                 
                 
    cn.execute(
        query, [body.id, body.username, body.password, body.status],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );

})


app.post('/usuarios', (req, res)=>{
    const body = req.body;
    res.json(body)
})


app.listen(port, () => {
    console.log('localhost:'+port);
})