const nodemailer = require('nodemailer')
const sendEmail = async function(email,subject,message)
{
    let transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST ,
        secure:false,
        auth:{
            user:process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
        
       })

await nodemailer.transporter.sendMail({
    from: "santhosh",
    to: email,
    subject: subject,
    html:message
})
}

module.exports = sendEmail
