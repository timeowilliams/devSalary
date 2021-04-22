const db = require('../model/dbModel');

const applicationsController = {};

applicationsController.getApplications = (req, res, next) => {
  console.log('IN GET APPS');
  const query = `SELECT * FROM applications`;
  console.log('GETTING APPS');
  db.query(query)
    .then((data) => {
      res.locals.allApplications = data.rows;
      return next();
    })
    .catch((err) => {
      next({
        log: 'error in applicationsController.getApplications' + err,
        status: 300,
      });
    });
};

module.exports = applicationsController;
