const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');

// getApplications
// router.get('/', applicationsController.getApplications, (req, res) => {
//   return res.status(200).json('ok');
// });

router.get('/', (req, res) => {
  return res.status(200).json('ok');
});

// postApplications

// updateApplication

// deleteApplication

module.exports = router;
