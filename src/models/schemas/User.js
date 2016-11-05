'use strict';

const bcrypt = require('bcryptjs');
const ROLE_VALUES = ['SUPERADMIN', 'ADMIN'];
const SALT_WORK_FACTOR = 10;

let model;

module.exports = (mongoose, name) => {
  const schema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },

    encrypted_password: {
      type: String,
      required: [true, 'Contraseña requerida']
    },

    role: {
      type: String,
      values: ROLE_VALUES,
      default: 'ADMIN'
    },

    c_at: {
      type: Date,
      default: new Date()
    },

    u_at: {
      type: Date
    }
  });

  schema.statics.signup = function(data, cb) {
    const userData = {
      name: data.name,
      encrypted_password: data.password,
      role: data.role
    };
    model.create(userData, (err, user) => {
      if (err) {
        return cb(err);
      }
      cb(err, user);
    });
  };

  schema.pre('save', function (next) {
    if (this.isModified('encrypted_password')) {
      bcrypt.hash(this.encrypted_password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) {
          return next(err);
        }
        this.encrypted_password = hash;
      })
    }

    this.u_at = Date.now();
    next();
  });

  /* Authentication methods */
  schema.statics.authenticate = function(username, password, done) {
    console.info(username, password);
    model.findOne({
      name: username
    }, (err, user) => {
      if (err) {
        console.error('FindOne error');
        done(err, false);
        return;
      }

      if (user) {
        bcrypt.compare(password, user.encrypted_password, (err, isValid) => {
          if (err || !isValid) {
            if (err) {
              console.error('bcrypt compare');
              done(err, false);
              return;
            }
            console.error('authentication fail');
            done(err, false);
          } else {
            done(null, user);
          }
        });
      } else {
        console.error('User not found');
        done(null, false);
      }
    });
  };

  schema.statics.serialize = function(user, done) {
    done(null, user._id);
  };

  schema.statics.deserialize = function(id, done) {
    model.findById(id).then(user => {
      done(null, user);
    }).catch(err => {
      done(err);
    });
  };

  model = mongoose.model(name, schema);

  return model;
};
