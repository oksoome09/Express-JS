const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'web_app',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is running at port no : 3000'));


//Get all employees
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM nodejs_pm ', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an employees
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM nodejs_pm WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an employees
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM nodejs_pm WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an employees
app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO nodejs_pm (Name,EmpCode,Salary) VALUES(?,?,?);";
    mysqlConnection.query(sql,[emp.Name,emp.EmpCode,emp.Salary], (err) => {
        if (!err)
            res.send('Inserted Successful');
        else
            console.log(err);
    });
});

//Update an employees
app.put('/employees/:id', (req, res) => {
    let emp = req.body;
    var sql = "UPDATE nodejs_pm SET Name = ?, EmpCode = ? , Salary = ? WHERE EmpID = ?";
    mysqlConnection.query(sql, [emp.Name,emp.EmpCode,emp.Salary,req.params.id], (err) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    });
});
