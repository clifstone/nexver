const nodemailer = require('nodemailer')
export default async (req, res) => {
    require('dotenv').config()

    const transporter = nodemailer.createTransport({
        port: 587,     
        host: "smtp.office365.com",
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
        },
        tls: {
            ciphers:'SSLv3'
        }
    });

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
    
    const mailData = {
        from: process.env.USER,
        to: process.env.USER,
        subject: `Message From ${req.body.yourName}`,
        text: req.body.yourMessage + " | Sent from: " + req.body.email,
        html: `<p>Message Sender: ${req.body.yourName}</p><p>Sender Email: ${req.body.email}</p><div>${req.body.yourMessage}</div>`
    }

    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });
    
    res.status(200).json({ status: "OK" });
}