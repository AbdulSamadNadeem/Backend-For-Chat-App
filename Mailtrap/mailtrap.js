const mailtrap = require('./email')

exports.SendResetEmail = async (email,url) => {
    await mailtrap.transporter.sendMail({
        from: `${mailtrap.sender.name} <${mailtrap.sender.email}>`,
        to: email,
        subject: "Reset Password",
        text: `this is the link ${url}`
      });
}