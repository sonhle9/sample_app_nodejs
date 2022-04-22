const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, tokenService } = require('../services');
// const { User } = require('../models');
// const { authService } = require('../services');

const newSession = catchAsync(async (req, res) => {
  const locals = {
    title: 'Welcome to the Sample App',
    description: 'Page Description',
    header: 'Page Header',
  };
  res.status(httpStatus.OK).render('sessions/new', locals);
});

const create = catchAsync(async (req, res) => {
  const { email, password } = req.body.session;
  // eslint-disable-next-line no-console
  console.log(req.body);
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const destroy = (req, res) => {
  res.render('static_pages/about');
};

module.exports = {
  newSession,
  create,
  destroy,
};
