const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017'; 
  // For MongoDB Atlas, it would be something like:
  // const mongoURI = 'mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority';

  mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    // You can start defining schemas and models here
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

  // Example of a simple schema and model (optional for connection)
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
  });

  const User = mongoose.model('User', userSchema);
