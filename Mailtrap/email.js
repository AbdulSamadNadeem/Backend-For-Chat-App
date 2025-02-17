const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: 'uriah.block27@ethereal.email',
        pass: 'ZwSUusqD55KyFttS9u'
    },
  });
  
const sender = {
    email : "chitshatsupport@gmail.com",
    name : "ChitShatSupport"
} 
module.exports = {transporter , sender}