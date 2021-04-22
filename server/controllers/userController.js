const db = require('../model/dbModel');

const userController = {};

//Gets all users from the users table and returns to client
userController.getUsers = (req, res, next) => {
  const query = `SELECT * FROM users ORDER BY id`;
  db.query(query)
    .then((data) => {
      console.log(data.rows);
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

//Adds a new user to the users table - CONSIDER REMOVING THIS FUNCTION
userController.postUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({
      log: 'error in userController.postUsers: Missing email or password',
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

//Deletes a user from the users table
userController.deleteUser = (req, res, next) => {
  const id = Number(req.params.id);

  if (typeof id !== 'number') {
    return next({
      log: 'error in userController.deleteUsers: id is not a number',
      status: 300,
    });
  }

  const query = `DELETE FROM users WHERE id = $1 RETURNING *`;

  db.query(query, [id])
    .then((data) => {
      res.locals.deletedUser = data.rows[0];
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in messageController.deleteMessage' + err,
        status: 300,
      });
    });
};

//updates a user in the users table - CONSIDER REMOVING THIS
userController.updateUser = (req, res, next) => {
  const { password } = req.body;
  //extract id from jwt
  //use id to update user password
  let id;

  const query = `UPDATE users SET password=$1, WHERE id=$2 RETURNING *`;

  db.query(query, [password, id])
    .then((data) => {
      return next();
    })
    .catch((err) => {
      return next({
        log: 'error in userController.updateUsers' + err,
        status: 300,
      });
    });
};

module.exports = userController;
