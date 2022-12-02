const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User.model')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const authRouter = require('./routes/auth.routes')
const methodOverride = require('method-override')
const app = express()
require("dotenv").config();
require("./config/session.config")(app);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})



app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
  res.render('articles/home.ejs')
})

app.get('/home', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter);
app.use('/', authRouter)

app.listen(process.env.PORT);