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
const connectDB = require('./config/db');
const Handle = require('handlebars');
const { swaggerUi, swaggerDocs } = require('./swager/swagger');
const methodOverride = require('method-override');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Conectar a MongoDB
connectDB().then(async () => {
    console.log('Connected to MongoDB');
    //  await createMockProducts();
    })
   .catch(err => console.error('MongoDB connection error:', err));
// mongoose.connect(process.env.DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//  .then(async () => {
// //     console.log('Connected to MongoDB');
// //     await createMockProducts();
//   })
//  .catch(err => console.error('MongoDB connection error:', err));

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

app.use(methodOverride('_method'));

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
app.use(express.static(path.join(__dirname, 'views')));

// Variables globales
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
// Registrar helper 'eq'
Handle.registerHelper('eq', (a, b) => {
    return a === b;
  });
// Rutas
app.use('/',routes);  // Usar el index de rutas

  // Configurar Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
