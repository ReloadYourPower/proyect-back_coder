const dotenv = require('dotenv') 
dotenv.config()
const adminJson = JSON.parse(process.env.JWT_SECRET);

module.exports = {
  ensureAdmin: (req, res, next) => {
    const jsonData = req.body.jsonData;
    try {
      const parsedData = JSON.parse(jsonData);
      if (JSON.stringify(parsedData) === JSON.stringify(adminJson)) {
        req.user.role = 'admin';
        return next();
      } else {
        req.flash('error_msg', 'You do not have permission to view this resource');
        res.redirect('/profile');
      }
    } catch (e) {
      req.flash('error_msg', 'Invalid JSON format.');
      res.redirect('/profile');
    }
  }
};

  