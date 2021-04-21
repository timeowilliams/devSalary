const db = require('../model/dbModel');

const userController = {};

//Gets all users from the users table and returns to client

userController.getUsers = (req, res, next) => {
  const query = `SELECT * FROM users ORDER BY id`;

  db.query(query)
    .then((data) => {
      res.locals.allUsers = data.rows;
      return next();
    })
    .catch((err) => {
      next({
        log: 'error in userController.getUsers' + err,
        status: 300,
      });
    });
};

//Adds a new user to the users table

userController.postUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({
      log: 'error in userController.postUsers',
      status: 300,
    });
  }

  const query = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`;

  db.query(query, [email, password])
    .then((data) => {
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in userController.postUsers' + err,
        status: 300,
      });
    });
};

module.exports = userController;
