const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');
// import authController

router.get(
  '/',
  // this represents the authController
  (req, res, next) => {
    console.log('applications.js: line 10');
    if (!req.body.webToken) {
      console.log('applications.js: line 12');
      return next({
        log: 'Unauthorized request for applications.',
        status: 400,
        message: 'An error occurred. Please, try again.',
      });
    }
    console.log('applications.js: line 18');
    next();
  },
  // this represents middleware that extracts the users_id
  (req, res, next) => {
    console.log('applications.js: line 24');
    res.locals.users_id = 1;
    next();
  },
  applicationsController.getApplications,
  (req, res) => {
    console.log('applications.js: line 30');
    console.log(res.locals.applications);
    return res.status(200).json();
  }
);
// postApplications
router.post(
  '/',
  // this represents the authController
  (req, res, next) => {
    console.log('applications.js: line 39');
    if (!req.body.webToken) {
      console.log('line 41');
      return next({
        log: 'Unauthorized request for applications.',
        status: 400,
        message: 'An error occurred. Please, try again.',
      });
    }
    next();
  },
  // this represents middleware that extracts the users_id
  (req, res, next) => {
    console.log('line 52');
    res.locals.users_id = 15;
    next();
  },
  applicationsController.postApplication,
  (req, res) => {
    return res.status(200).json(res.locals.applications);
  }
);

// updateApplication
router.put(
  '/',
  (req, res, next) => {
    console.log('applications.js: line 66');
    if (!req.body.webToken) {
      console.log('line 68');
      return next({
        log: 'Unauthorized request for applications.',
        status: 400,
        message: 'An error occurred. Please, try again.',
      });
    }
    next();
  },
  // this represents middleware that extracts the users_id
  (req, res, next) => {
    console.log('line 79');
    res.locals.users_id = 15;
    next();
  },
  applicationsController.editApplication,
  (req, res) => {
    return res.status(200).json(res.locals.applications);
  }
);

// deleteApplication
router.delete(
  '/',
  (req, res, next) => {
    console.log('applications.js: line 93');
    if (!req.body.webToken) {
      console.log('line 95');
      return next({
        log: 'Unauthorized request for applications.',
        status: 400,
        message: 'An error occurred. Please, try again.',
      });
    }
    next();
  },
  applicationsController.deleteApplication,
  (req, res) => {
    return res.status(200).json(res.locals.applications);
  }
);

module.exports = router;
