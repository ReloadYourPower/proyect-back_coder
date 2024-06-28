
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  console.log('Register user endpoint hit');
  console.log('Request body:', req.body);
  const { name, email, password, password2 } = req.body;
  console.log('Received data:::', name, email, password, password2);

  let errors = [];

  // Validaciones
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  }

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ email: email });
    if (user) {
      errors.push({ msg: 'Email already exists' });
      return res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
      });
    }

    // Crear un nuevo usuario
    const newUser = new User({ name, email, password });

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    // Guardar el usuario en la base de datos
    await newUser.save();
    console.log('Nuevo usuario guardado:', newUser);

    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/login');
  } catch (err) {
    console.error('Error al registrar el usuario:', err);
    errors.push({ msg: 'An error occurred while registering the user' });
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  }
};



const logoutUser = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('login');
};

const loginPage = (req, res) => {
  res.render('login');
};

const registerPage = (req, res) => {
  res.render('register');
};

module.exports = {
  registerPage, registerUser, loginPage, logoutUser
};
