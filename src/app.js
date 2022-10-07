const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const viewRoute = require('./routes/viewRoute');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const app = express();
require('dotenv').config();

const { MONGO_URI, NODE_ENV, PORT } = process.env;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// PUBLIC
app.use(express.static('./src/public'));

app.set('views', './src/views');
app.set('view engine', 'pug');

app.use('*', cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

NODE_ENV === 'production' ? app.use(morgan('combined')) : app.use(morgan('dev'));

app.use('/', viewRoute);
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/users', userRoute);

app.all('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
