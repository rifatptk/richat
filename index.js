const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
//internal imports
const {
  notFoundHandler,
  errorHandler,
} = require('./middlewares/common/errorHandler');
const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const inboxRouter = require('./routes/inboxRouter');

const app = express();
dotenv.config();

//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connection with mongodb successful'))
  .catch((err) => console.log(err));

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set('view engine', 'ejs');

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use('/', loginRouter);
app.use('/user', userRouter);
app.use('/inbox', inboxRouter);

//error handling
//404 not found
app.use(notFoundHandler);
//common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
