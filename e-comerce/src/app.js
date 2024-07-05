const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const routes = require('./index');  // Importar el index de rutas
const hash = require('./config/passport');
const Product = require('./models/Product');
const { swaggerUi, swaggerDocs } = require('./swager/swagger');
const createMockProducts = require('./utils/mocking');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('Connected to MongoDB');
    await createMockProducts();
  })
.catch(err => console.error('MongoDB connection error:', err));

// Configurar sesiones
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL })
}));

// Passport config y middleware
hash(passport);
app.use(passport.initialize());
app.use(passport.session());

// Configurar Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Rutas
app.use('/',routes);  // Usar el index de rutas
app.use('/profile/products', async (req, res) => {
    const products = await Product.find({});
    res.send( { products });
  });
  // Configurar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Incluir rutas
// const exampleRoute = require('./routes/swagger/userSwa');
// app.use('/api', exampleRoute);
  // Configurar Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
