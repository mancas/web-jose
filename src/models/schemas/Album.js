'use strict';

let model;

module.exports = (mongoose, name) => {
  const schema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },

    summary: String,

    c_at: {
      type: Date,
      default: new Date()
    },

    u_at: {
      type: Date
    }
  });

  // TODO: add statics methods

  model = mongoose.model(name, schema);

  return model;
};
