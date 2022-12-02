const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');



const signupGetController = (req, res, next) => {
  res.render('articles/signup');
};

const signupPostController = (req, res, next) => {
  console.log(req.body);

  res.redirect('/login');

  if(!req.body.email || ! req.body.password){
    res.send('Sorry you forgot an email or password');
    return;
  }

  User.findOne({ email: req.body.email })
    .then(foundUser => {
      
      if(foundUser){
        res.send('Sorry user already exists');
        return;
      }

      const myHashedPassword = bcryptjs.hashSync(req.body.password)

      return User.create({
        email: req.body.email,
        password: myHashedPassword
      })
      
    })
    .then(createdUser => {
      console.log("here's the new user", createdUser);
      res.send(createdUser);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
};

const loginGetController = (req, res, next) => {
  res.render('articles/login');
};

const loginPostController = (req, res, next) => {
  console.log(req.body);

  const { email, password } = req.body;

  if(!email || !password){
    res.render('articles/login', { errorMessage: 'Sorry you forgot email or password' });
    return;
  }

  User.findOne({ email })
    .then(foundUser => {

      if(!foundUser){
        // res.send('Sorry user does not exist');
        res.render('articles/login', { errorMessage: 'Sorry user does not exist' })
        return;
      }

      const isValidPassword = bcryptjs.compareSync(password, foundUser.password);

      
      if(!isValidPassword){
        // res.send('Sorry wrong password');
        res.render('articles/login', { errorMessage: 'Sorry wrong password' })
        return;
      }

      req.session.user = foundUser;

     res.redirect('/home')

    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
  
}

// const profileGetController = (req, res, next) => {
//     axios.get('https://anime-facts-rest-api.herokuapp.com/api/v1')
//     .then(animeList => {
//         const animeInfo = animeList.data.data;
//         const random = animeInfo[Math.floor(Math.random() * animeInfo.length)];

// console.log(random); // 👉️ three
//         // console.log(animeList.data.data[i]);
//         res.render('facts.hbs', random);
//     })
//     .catch(err => console.log(err));
// }

module.exports = {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
};