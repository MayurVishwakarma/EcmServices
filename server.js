
// // app.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const userRoutes = require('./routes/userRoutes');
// const projectRoutes = require('./routes/ProjectRoutes');

// const app = express();

// app.use(bodyParser.json());

// // Token middleware
// const requireToken = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (token && token === "Bearer 03ti9vnhmrwq0qhinzsw5jkj0cad97jtl1n0fpywzxloj4m0yi7kj9b0pk0m623r0elmq") {
//     next(); // Token is valid, continue to next middleware
//   } else {
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// };

// // Serve static files from the public folder
// app.use(express.static('Public'));

// // Home page route
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/Public/Index/index.html');
// });



// // Apply token middleware to all routes under /users
// app.use('/users', requireToken, userRoutes);
// app.use('/project', requireToken, projectRoutes);

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });


const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.post('/api/uplink', (req, res) => {
  const uplinkData = req.body;

  console.log('Received Uplink Data:', JSON.stringify(uplinkData, null, 2));

  // Send acknowledgment to ChirpStack
  res.status(200).send('Uplink received');
});

app.listen(port, () => {
  console.log(`Uplink server listening at http://localhost:${port}`);
});