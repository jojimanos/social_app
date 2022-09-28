const jwt = require('jsonwebtoken')
const User = require('../models/user')
const sendgrid = require('@sendgrid/mail');
const { registerEmail } = require('../helpers/email');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.register = (req, res) => {

  const { firstName, lastName, email, birthDate, password } = req.body
  //check if user exists in our db
  User.findOne(req.body.email).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'email is taken'
      })
    }
    // generate token with all fields
    const token = jwt.sign(req.body, process.env.JWT_ACCOUNT_ACTIVATION, {
      expiresIn: '10m'
    })
    const register = registerEmail(firstName, lastName, email, birthDate, password, token)

    sendgrid
      .send(register)
      .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
        res.json({
          message: `Email has been sent to ${email}, Follow the instructions to compolete your registration`
        })
      })
      .catch((error) => {
        console.error(error)
        res.json({
          message: `We could not verify your email. Please try again`
        })
      })
  })
}