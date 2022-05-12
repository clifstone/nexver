export default function (req, res) {
    require('dotenv').config()

    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 587,     
      host: "smtp.office365.com",
    secure: false,
         auth: {
              user: process.env.USER,
              pass: process.env.PASSWORD,
           },
    });
    
    const mailData = {
        from: process.env.USER,
        to: process.env.USER,
        subject: `Message From ${req.body.name}`,
        text: req.body.message + " | Sent from: " + req.body.email,
        html: `<div>${req.body.message}</div><p>Sent from: ${req.body.email}</p>`
    }
  
    transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    })
  
    console.log(req.body)
    res.status(200)
}