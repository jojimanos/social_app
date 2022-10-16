const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../models/user');
const sendgrid = require('@sendgrid/mail');;
const { registerEmail, forgotPasswordEmail } = require('../helpers/email');
const shortId = require('shortid');
const user = require('../models/user');

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

exports.registerActivate = (req, res) => {
  const { token } = req.body;
  console.log(token);
  jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        error: 'Expired link. Try again'
      });
    }

    const { firstName, email, password } = jwt.decode(token);
    const username = shortId.generate();

    User.findOne({ email }).exec((err, user) => {
      if (user) {
        return res.status(401).json({
          error: 'Email is taken'
        });
      }

      // register new user
      const newUser = new User({ username, firstName, email, password });
      newUser.save((err, result) => {
        if (err) {
          return res.status(401).json({
            error: 'Error saving user in database. Try later'
          });
        }
        return res.json({
          message: 'Registration success. Please login.'
        });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please register.'
      })
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password do not match.'
      })
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    const { _id, firstName, email, role } = user

    return res.json({
      token,
      user: { _id, firstName, email, role }
    })
  })
}

exports.requireSignin = expressJwt({ secret: process.env.JWT_SECRET }); // req.user

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findOne({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;
  User.findOne({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    if (user.role !== 'admin') {
      return res.status(400).json({
        error: 'Admin resource. Access denied'
      });
    }

    req.profile = user;
    next();
  });
};

exports.forgotPassword = (req, res) => {
  const {email} = req.body
  // check if user exists with that email
  User.findOne({email}).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist'
        });
    }
    // generate token and email to user 
    const token = jwt.sign({name: user.name}, process.env.JWT_RESET_PASSWORD, {expiresIn: '10m'})
    // send email
    const forgot = forgotPasswordEmail(firstName, lastName, email, birthDate, password, token)
  
    // populate the db > user > resetPasswordLink
    return user.updateOne({resetPasswordLink: token}, (err, success) => {
      if(err) {
        return res.status(400).json({
          error: 'Password reset failed. Try later.'
        })
      }
      sendgrid
      .send(forgot)
      .then((response) => { 
        console.log(response[0].statusCode)
        console.log(response[0].headers)
        res.json({
          message: `Email has been sent to ${email}, Follow the instructions to reset your password`
        })
      })
      .catch((error) => {
        console.error(error)
        res.json({
          message: `We could not verify your email. Please try again`
        })
      })
    })
  })
};

exports.resetPassword = (req, res) => {
  //
}