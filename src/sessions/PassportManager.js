'use strict';

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/').models.User;
let passport;

module.exports = {
  configure: function(pass) {
    passport = pass;
    this.configurePassport();
    this.configureSerializer();
    this.configureDeserializer();
  },

  configurePassport: function() {
    passport.use(new LocalStrategy(User.authenticate));
  },

  configureSerializer: function() {
    passport.serializeUser(User.serialize);
  },

  configureDeserializer: function() {
    passport.deserializeUser(User.deserialize);
  }
};
