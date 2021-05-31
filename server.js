const express = require('express');
const database = require('./config/database');
const Client = require('./models/Client');
const Simcard = require('./models/Simcard');
const Product = require('./models/Product');
const clientRoutes = require('./routes/clientRoutes');
const simecardRoutes = require('./routes/simcardRoutes');
const productType = require('./routes/productTypeRoutes');
const productRoutes = require('./routes/productRoutes');
const productTypeRoutes = require('./routes/productTypeRoutes');
const subscriptionTypeRoutes = require('./routes/subscriptionTypeRoutes');
const createSubscription = require('./routes/subscriptionRoutes');
const msal = require('@azure/msal-node');

const router = require('./routes/productRoutes');

const app = express();

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

const config = {
  auth: {
    clientId: 'f0fdd6b3-7a95-4448-8c3b-97cb1ab62200',
    authority: 'https://login.microsoftonline.com/common',
    clientSecret: 'sdJi0FbTS0Ur-yUA1Hi8~h~Y5E5.0tQq~9',
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

// app.use(clientRoutes);
// app.use(productRoutes);
// app.use(productTypeRoutes);
// app.use(subscriptionTypeRoutes);
app.use(router);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send('This Is The Home Page');
// });

// Create msal application object
const cca = new msal.ConfidentialClientApplication(config);

app.get('/', (req, res) => {
  const authCodeUrlParameters = {
    scopes: ['Get.Data'],
    redirectUri: 'http://localhost:3000/main',
  };

  // get url to sign user in and consent to scopes needed for application
  cca
    .getAuthCodeUrl(authCodeUrlParameters)
    .then((response) => {
      res.redirect(response);
    })
    .catch((error) => console.log(JSON.stringify(error)));
});

app.get('/redirect', (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ['Get.Data'],
    redirectUri: 'http://localhost:3000/main',
  };

  cca
    .acquireTokenByCode(tokenRequest)
    .then((response) => {
      console.log('\nResponse: \n:', response);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

router.get('/main', (req, res) => {
  res.render('main');
});

app.use('/api/client', require('./routes/clientRoutes'));
app.use('/api/simcard', require('./routes/simcardRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/product', require('./routes/productTypeRoutes'));
app.use('/api/subscription', require('./routes/subscriptionTypeRoutes'));
app.use('/api/subscription', require('./routes/subscriptionRoutes'));

app.listen(PORT, console.log(`Server started on ${PORT}`));
