const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./routes/user');
const statesRouter = require('./routes/states');
const applicationsRouter = require('./routes/applications');

app.disable('x-powered-by');

app.use(express.json());

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// cache

// users/authenticate - should be first to set tokens when necessary
app.use('/user', userRouter);
// states
app.use('/states', statesRouter);
// applications
app.use('/applications', applicationsRouter);

// route to server
// app.use()

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
