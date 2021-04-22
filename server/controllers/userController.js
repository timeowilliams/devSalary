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

module.exports = userController;
