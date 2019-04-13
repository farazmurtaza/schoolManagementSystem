const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');
const hbs = require('express-handlebars');

//const database = require('./database');
const users = require('./routes/users');
const login = require('./routes/login');
const admin = require('./routes/admin');
const student = require('./routes/student');
const teacher = require('./routes/teacher');
const app = express();



app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layout:__dirname+'/views',
  helpers:{
    math: function(lvalue, operator, rvalue) {
      lvalue = parseFloat(lvalue);
      rvalue = parseFloat(rvalue);
      return {
        "+":lvalue+rvalue,
        "-":lvalue-rvalue,
        "*":lvalue*rvalue,
        "/":lvalue/rvalue,
        "%":lvalue%rvalue
      }[operator];
    }
  }}));

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');


const port = 3000;

app.use(cors());

app.use(express.static('public'));
app.use(session({secret: "abcdefgh", resave:false, saveUninitialized: false, cookie: {maxAge: 60000*10}}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/login', login);
app.use('/users', users);
app.use('/admin', admin);
app.use('/student', student);
app.use('/teacher', teacher);


app.get('/', (req, res) => {
   res.render(path.join(__dirname,'./','views/layouts/fill.hbs'),{});
  //res.render('./fill.html', {root: __dirname});
});

app.listen(port, () =>{
  console.log('Server started at port '+port);
});
module.exports = app;
