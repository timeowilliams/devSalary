const db = require('../model/dbModel');

const applicationsController = {};

applicationsController.getApplications = (req, res, next) => {
  // change this for production
  const users_id = res.locals.users_id;
  const query = `SELECT * FROM applications WHERE users_id=$1`;

  db.query(query, [users_id])
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

// userController.postUser = (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next({
//       log: 'error userController.postUsers',
//       status: 300,
//     });
//   }

//   const query = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`;
//   console.log('userController.js: line 26');

//   db.query(query, [email, password])
//     .then((data) => {
//       console.log('DATA', data.rows[0]);
//       res.locals.user = data.rows[0];

//       return next();
//     })
//     .catch((err) => {
//       console.log('IN .CATCH');
//       return next({
//         log: 'error in userController.postUsers' + err,
//         status: 300,
//       });
//     });
// };

module.exports = applicationsController;
