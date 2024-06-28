const homePage = (req, res) => {
    res.render('index');
  };
  
  const registerPage = (req, res) => {
    res.render('register');
  };
  
  const loginPage = (req, res) => {
    res.render('login');
  };
  
  const dashboardPage = (req, res) => {
    res.render('profile');
  };
  const error401 = (req, res) => {
    res.render('error401');
  };
  
  module.exports = {
    dashboardPage,loginPage,registerPage,homePage
  }