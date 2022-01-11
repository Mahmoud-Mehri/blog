const Mailer = require('nodemailer');
// const SmtpTransport = require('nodemailer-smtp-transport');
const Config = require('../config');

module.exports = function sendMail(mailTo){
    var client = Mailer.createTransport({
        service: Config.mailer.service,
        auth: {
            user: Config.mailer.user,
            pass: Config.mailer.pass,
        }
    });

    var mailOptions = {
        from: Config.mailer.user,
        to: mailTo,
        subject: 'You have registered successfully',
        html: 'Thank you for your registration !'
    };

    client.sendMail(mailOptions, (err, info) => {
        if (err){
            console.log(err);
        }
    })
}
