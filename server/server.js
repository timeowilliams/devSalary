const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./routes/user');

app.use(express.json());

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// cache

// users/authenticate - should be first to set tokens when necessary
app.use('/user', userRouter);
// states
// applications

/*

for states
for updates
for users

*/

// route to server
// app.use()

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
