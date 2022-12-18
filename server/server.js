const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const todoRouter = require('./routes/to-do-router.js')

 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/tasks', todoRouter)


// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
