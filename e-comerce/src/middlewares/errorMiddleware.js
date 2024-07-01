module.exports = {
    notFound: (req, res, next) => {
      res.status(404).render('error404');
    },
    serverError: (err, req, res, next) => {
      console.error(err);
      res.status(500).render('error500');
    }
  };
  