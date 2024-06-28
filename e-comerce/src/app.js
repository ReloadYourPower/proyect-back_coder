const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const User = require('./models/User');
require('dotenv').config();

// Log para verificar la carga de variables de entorno
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
// Import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const viewRoutes = require('./routes/viewRoutes');
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser');

const app = express();

// Database connection
// Conectar a MongoDB usando la variable de entorno
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/passport';
// Conectar a MongoDB
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Conectado a MongoDB');
      // Crear un nuevo usuario
  // const newUser = new User({
  //   name: 'John Doe',
  //   email: 'john@example.com',
  //   password: 'password'
  // });

  // Guardar el usuario en la base de datos
  // newUser.save();
  // console.log('Usuario guardado correctamente:', newUser);

  }).catch(err => {
    console.log('Error al conectar a MongoDB:', err);
  });
  

// Configurar sesiones
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: dbURI }), // Utiliza la misma URI de conexión a MongoDB
  }));


// Passport config
const hash = require('./config/passport');
hash(passport);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Static folder
// Configurar el motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')



// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Middleware para parsear application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para parsear application/json
app.use(bodyParser.json());




// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});



// Routes
app.use('/', viewRoutes);
app.use('/auth', require('./routes/authRoutes'));
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
