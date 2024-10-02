const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from config.env
dotenv.config({
  path: './config.env',
});

const app = require('./index');

// Log environment variables for debugging
console.log('DB URL:', process.env.DATABASE);

// Ensure environment variables are defined
if (!process.env.DATABASE) {
  throw new Error('Database configuration not set properly in the environment variables');
}

// Use the local MongoDB connection string
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Successfully Connected');
  })
  .catch((err) => {
    console.error('Database Error', err);
  });

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
