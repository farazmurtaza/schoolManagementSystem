const express = require('express');
const path = require('path');
const router = express.Router();
const database = require('../database');
const nodemailer = require('nodemailer');
//register

// router.get('/register', (req, res, next) => {
//
// });
router.use(express.static(path.join(__dirname,'../','public')));

router.get('/register', (req, res)=>{
  res.render(path.join(__dirname,'../','views/layouts/register.hbs'),{});
});

router.post('/register', (req, res, next) =>{
  console.log(req.body);
  queryString = "INSERT INTO StudentProfile SET ?";
  const values = {SRegno: req.body.regno,
    FirstName: req.body.fname,
    LastName: req.body.lname,
    SUsername: req.body.username,
    SPassword: req.body.password,
    Class: req.body.class,
    Section: req.body.section,
    Phoneno: req.body.phone,
    EmailID: req.body.email,
    ParentEmailID: req.body.pemail};
    database.connection.query(queryString, [values], function(err, result){
      if(err) throw err;

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
       text: 'You have been registered to Nerdware as a Student', // plain text body
       html: 'You have been registered to Nerdware as a Student<br>Your login credentials are:<br><strong>Username: </strong>'+req.body.username+'<br><strong>Password: </strong>'+req.body.password // html body
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

// router.get('/register/teacher', (req, res)=>{
//   res.render(path.join(__dirname,'../','views/layouts/registerTeacher.hbs'),{});
// });
//
// router.post('/register/teacher', (req, res, next) =>{
//   console.log(req.body);
//   queryString = "INSERT INTO TeacherProfile SET ?";
//   const values = {TRegno: req.body.regno,
//     TFirstName: req.body.fname,
//     TLastName: req.body.lname,
//     TUsername: req.body.username,
//     TPassword: req.body.password,
//     TPhoneno: req.body.phone,
//     TEmailID: req.body.email,
//     TSubject1: req.body.s1,
//     TSubject2: req.body.s2};
//     database.connection.query(queryString, [values], function(err, result){
//       if(err) throw err;
//
//     });
//     res.render(path.join(__dirname,'../','views/layouts/success.hbs'),{});
// });

//authenticate
router.get('/authenticate', (req, res, next) =>{
  res.send('AUTHENTICATE');
});

//profile
router.get('/profile', (req, res, next) =>{
  res.send('PROFILE');
});

router.get('/validate', (req, res, next) =>{
  res.send('VALIDATE');
});


module.exports = router;
