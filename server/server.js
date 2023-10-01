require('./database/db')();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
      res.status(200).send('Hello World!');
});

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(5000, () => {
      console.log("Server ON!");
});