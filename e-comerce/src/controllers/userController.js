const User = require('../models/User');
const UserDTO = require('../dtos/UserDTO');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const userData = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }));
    res.render('users', { users: userData, user: req.user });
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/');
  }
};

const getCurrentUser = (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.render('DTO',{ userDTO });
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/users');
    }
    res.render('profile', { user });
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/users');
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/users');
    }
    req.flash('success_msg', 'User updated');
    res.redirect('/users');
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/users');
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/users');
    }
    req.flash('success_msg', 'User deleted');
    res.redirect('/users');
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/users');
  }
};

const changeUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/users');
    }
    user.role = user.role === 'user' ? 'premium' : 'user';
    await user.save();
    req.flash('success_msg', 'User role updated');
    res.redirect('/users');
  } catch (err) {
    req.flash('error_msg', 'Server error');
    res.redirect('/users');
  }
};




module.exports = {
  deleteUser,updateUser,getUserById,getUsers,changeUserRole,getCurrentUser
}
