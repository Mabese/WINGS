const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./config/serviceAccountKey.json');



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Firestore database
const db = admin.firestore();

// Routes
app.get('/products', async (req, res) => {
  const products = [];
  const snapshot = await db.collection('products').get();
  snapshot.forEach(doc => {
    products.push({ id: doc.id, ...doc.data() });
  });
  res.send(products);
});

// Add more routes for CRUD operations...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});