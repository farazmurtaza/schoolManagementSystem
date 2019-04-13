const path = require('path');
const express = require('express');
const router = express.Router();
const database = require('../database');
const findUser = require('./usermodel');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

router.use(bodyParser.json());

router.use(express.static(path.join(__dirname,'../','public')));

router.post('/login', (req, res)=>{
  console.log(req.body)
  var reg_no = req.body.regno;
  console.log(reg_no);
  let queryString = "SELECT TPassword, TRegno FROM TeacherProfile where TRegno = ?"
  database.connection.query(queryString,[req.body.regno],function(err1,result){
    if(err1){
      console.log('post error');
    }
    console.log(req.body.password);
    console.log(req.body.regno);
     if(result[0].TPassword == req.body.password){
        findUser.usermodel(result[0].TRegno,function(user){
        req.session.user = result[0].TRegno;
        console.log(req.session.user);
        res.redirect(307,'/teacher/profile');
      });
    }
    else {
      res.send('User not found');
    }
  });
});

router.get('/register', (req, res)=>{
  res.render(path.join(__dirname,'../','views/layouts/registerTeacher.hbs'),{});
});

router.post('/register', (req, res, next) =>{

    queryString = "INSERT INTO TeacherProfile SET ?";
    const values = {TRegno: req.body.tregno,
      TFirstName: req.body.fname,
      TLastName: req.body.lname,
      TUsername: req.body.username,
      TPassword: req.body.password,
      TPhoneno: req.body.phone,
      TEmailID: req.body.email,
      TSubject1: req.body.s1,
      TSubject2: req.body.s2};
      database.connection.query(queryString, [values], function(err, result){
        if(err){
          console.log('teacher post error');
        }
      });
      let transporter = nodemailer.createTransport({
         // host: 'smtp.ethereal.email',
         // port: 587,
         // secure: false, // true for 465, false for other ports
         service: 'gmail',
         auth: {
             user: 'memonmusaddiq@gmail.com', // generated ethereal user
             pass: 'Musaddiq123' // generated ethereal password
         }
     });

     // setup email data with unicode symbols
     let mailOptions = {
         from: '"Nerdware" <memonmusaddiq@gmail.com>', // sender address
         to: req.body.email, // list of receivers
         subject: 'Welcome to Nerdware, '+req.body.fname, // Subject line
         text: 'You have been registered to Nerdware as a Teacher', // plain text body
         html: 'You have been registered to Nerdware as a Teacher<br>Your login credentials are:<br><strong>Username: </strong>'+req.body.username+'<br><strong>Password: </strong>'+req.body.password // html body
     };

     // send mail with defined transport object
     transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
             return console.log(error);
         }
         console.log('Message sent: %s', info.messageId);
         // Preview only available when sending through an Ethereal account
         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
      res.render(path.join(__dirname,'../','views/layouts/success.hbs'),{});
});

router.get('/info', (req, res)=>{
  res.render(path.join(__dirname,'../','views/layouts/fillteacher.hbs'),{});
});

router.post('/info', function(req, res){
  var teacher_info=[];
  //if(req.session.user){
    console.log(req.body.regno);
    let queryString1 = "SELECT TRegno, TFirstName, TLastName, TUsername, TPhoneno, TEmailID, TSubject1, TSubject2 from TeacherProfile where TRegno = ?";
    database.connection.query(queryString1,[req.body.regno], function(err, result){
        if(err) throw err;
        else{
          teacher_info={
            tregno:result[0].TRegno,
            firstName:result[0].TFirstName,
            lastName:result[0].TLastName,
            username:result[0].TUsername,
            phoneno:result[0].TPhoneno,
            email:result[0].TEmailID,
            s1:result[0].TSubject1,
            s2:result[0].TSubject2
          }
        }

        console.log(teacher_info);
        res.render(path.join(__dirname,'../','views/layouts/teacher.hbs'),{teacherInfo: teacher_info});

    });
  //}
});

router.post('/profile', function(req, res){
  var teacher_info=[];
  //if(req.session.user){
    console.log(req.body.regno);
    let queryString1 = "SELECT TRegno, TFirstName, TLastName, TUsername, TPhoneno, TEmailID, TSubject1, TSubject2 from TeacherProfile where TRegno = ?";
    database.connection.query(queryString1,[req.body.regno], function(err, result){
        if(err) throw err;
        else{
          teacher_info={
            tregno:result[0].TRegno,
            firstName:result[0].TFirstName,
            lastName:result[0].TLastName,
            username:result[0].TUsername,
            phoneno:result[0].TPhoneno,
            email:result[0].TEmailID,
            s1:result[0].TSubject1,
            s2:result[0].TSubject2
          }
        }

        console.log(teacher_info);
        res.render(path.join(__dirname,'../','views/layouts/teacherProfile.hbs'),{teacherInfo: teacher_info});

    });
  //}
});

router.get('/logout', (req, res)=>{
  if(req.session.user){
    req.session.destroy();
    res.send("You are now logged out");
  }
});

// router.get('/update', (req, res)=>{
//   res.render(path.join(__dirname,'../','views/layouts/update.hbs'),{});
// });
//
// router.post('update', (req, res)=>{
//
// });


module.exports = router;
