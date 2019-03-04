const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// router.get('/signup', requireAnon, async (req, res, next) => {
router.get('/signup', async (req, res, next) => {
  const data = {
    messages: req.flash('validation')
  };
  try {
    res.render('auth/signup', data);
  } catch (error) {
    next(error);
  }
});
// router.post('/signup', requireAnon, requireFields, async (req, res, next) => {
router.post('/signup', async (req, res, next) => {
  //  Extraer body
});

router.get('/login', async (req, res, next) => {
  // protegim la ruta dels usuaris loggats
  const data = {
    messages: req.flash('validation')
  };
  try {
    res.render('/login');
  } catch (error) {
    next(error);
  }

});

router.post('/login', async (req, res, next) => {
  // recuperar dades del body
  const { username, password } = req.body;

  // validem que no estiguin vuides
  if (!username || !password) {
    // tornem a la mateixa vista
    res.redirect('/login');
  }

  // comprovem que l' usuari estigui donat d' alta
  try {
    const user = await User.findOne({ username });
    if (!user) {
      // req.flash('validation', 'Username or password incorrect');
      res.redirect('/login');
      return;
    }
    // comparar contraseña proporcionada con almacenada
    if (bcrypt.compareSync(password, user.password)) {
      // Save the login in the session!
      req.session.currentUser = user;
      res.redirect('/');
    } 
    else {
      res.redirect('/login');
    }  
  } catch (error) {
    next(error);
  };
 
};

module.exports = router;
