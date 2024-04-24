module.exports = {
    userIsLoged: (req,res,next) =>  {
        // el usuario debe tener una sesion iniciada
        const isLogdIn = ! [null,undefined].includes(req.session.user) ;
        if (!isLogdIn) {
            res.redirect('/error400')
        }
        next();
    },
    userNoIsLoged: (req,res,next) =>  {
        // el usuario no debe tener una sesion iniciada
        const isLogdIn = ! [null,undefined].includes(req.session.user) ;
        if (isLogdIn) {
            res.redirect('/error500')
        }
        next();
    }
}