const db = require('../model/dbModel');

const applicationsController = {};

applicationsController.getApplications = (req, res, next) => {

  // change this for production
  const users_id = res.locals.users_id;
  const states_id = req.body.states_id;
  // add for states
  // SELECT * FROM applications WHERE states_id=1 AND users_id=1
  const query = `SELECT * FROM applications WHERE users_id=$1 AND states_id=$2`;

  db.query(query, [users_id, states_id])

    .then((data) => {
      res.locals.applications = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in applicationsController.getApplications' + err,
        status: 300,
      });
    });
};


applicationsController.postApplication = (req, res, next) => {
  console.log('postApp: line 24');
  // change this for production
  const users_id = res.locals.users_id;
  // saves req.body properties as variables
  const { states_id, company, salary, job_title, status, platform } = req.body;
  console.log('line 29');
  const query = `INSERT INTO applications(users_id, states_id, company, salary, job_title, status, platform) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

  db.query(query, [
    users_id,
    states_id,
    company,
    salary,
    job_title,
    status,
    platform,
  ])
    .then((data) => {
      console.log('line 42');
      res.locals.applications = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in applicationsController.postApplication' + err,
        status: 300,
      });
    });
};

applicationsController.editApplication = (req, res, next) => {
  console.log('postApp: line 55');
  // change this for production
  const users_id = res.locals.users_id;
  // saves req.body properties as variables
  const {
    states_id,
    company,
    salary,
    job_title,
    status,
    platform,
    applications_id,
  } = req.body;
  console.log(req.body);
  console.log('line 68');
  const query = `UPDATE applications SET states_id=$1, company=$2, salary=$3, job_title=$4, status=$5, platform=$6 WHERE id=$7 RETURNING *`;

  db.query(query, [
    states_id,
    company,
    salary,
    job_title,
    status,
    platform,
    applications_id,
  ])
    .then((data) => {
      console.log('line 82');
      console.log(data.rows);
      res.locals.applications = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in applicationsController.editApplication' + err,
        status: 300,
      });
    });
};

applicationsController.deleteApplication = (req, res, next) => {
  console.log('postApp: line 97');
  // change this for production
  const applications_id = req.body.applications_id;
  console.log('line 68');
  const query = `DELETE FROM applications WHERE id=$1 RETURNING *`;

  db.query(query, [applications_id])
    .then((data) => {
      console.log('line 104');
      console.log(data.rows);
      res.locals.applications = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in applicationsController.deleteApplication' + err,
        status: 300,
      });
    });
};

module.exports = applicationsController;
