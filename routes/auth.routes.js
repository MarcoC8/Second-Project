const { 
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
  } = require('../controllers/auth.controllers');
  
  const {isLoggedIn, isAnon} = require('../middlewares/auth.middlewares');
  
  const router = require('express').Router();
  
  router.get('/signup', signupGetController);
  
  router.post('/signup', signupPostController);
  
  router.get('/login', isAnon, loginGetController);
  
  router.post('/login', isAnon, loginPostController);
  
  router.get('/facts', isLoggedIn);
  
  router.get('/logout', (req, res, next)=>{
    req.session.destroy(()=> {
      res.redirect('/');
    })
  });
  
  module.exports = router;