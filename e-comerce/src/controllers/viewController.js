const homePage = (req, res) => {
    res.render('home');
  };
  
  const registerPage = (req, res) => {
    res.render('register');
  };
  
  const loginPage = (req, res) => {
    res.render('login');
  };
  
  const dashboardPage = (req, res) => {
    res.render('dashboard');
  };
  
  module.exports = {
    dashboardPage,loginPage,registerPage,homePage
  }