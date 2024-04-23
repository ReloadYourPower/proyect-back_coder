const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://reloadyoupower:80mSmV56CAe6cYwl@cluster0.vrb7xui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB.');
});

module.exports = db;