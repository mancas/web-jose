'use strict';

const Inotify = require('inotify').Inotify;
const inotify = new Inotify(); //persistent by default, new Inotify(false) //no persistent

const callback = function(event) {
  const mask = event.mask;
  let type = mask & Inotify.IN_ISDIR ? 'directory ' : 'file ';
  if (event.name) {
    type += ' ' + event.name + ' ';
  } else {
    type += ' ';
  }
  // the purpose of this hell of 'if' statements is only illustrative.

  if (mask & Inotify.IN_ACCESS) {
    console.log(type + 'was accessed ');
  } else if (mask & Inotify.IN_MODIFY) {
    console.log(type + 'was modified ');
  } else if (mask & Inotify.IN_OPEN) {
    console.log(type + 'was opened ');
  } else if (mask & Inotify.IN_CLOSE_NOWRITE) {
    console.log(type + ' opened for reading was closed ');
  } else if (mask & Inotify.IN_CLOSE_WRITE) {
    console.log(type + ' opened for writing was closed ');
  } else if (mask & Inotify.IN_ATTRIB) {
    console.log(type + 'metadata changed ');
  } else if (mask & Inotify.IN_CREATE) {
    console.log(type + 'created');
  } else if (mask & Inotify.IN_DELETE) {
    console.log(type + 'deleted');
  } else if (mask & Inotify.IN_DELETE_SELF) {
    console.log(type + 'watched deleted ');
  } else if (mask & Inotify.IN_MOVE_SELF) {
    console.log(type + 'watched moved');
  } else if (mask & Inotify.IN_IGNORED) {
    console.log(type + 'watch was removed');
  } else if (mask & Inotify.IN_MOVED_FROM) {
    data = event;
    data.type = type;
  } else if (mask & Inotify.IN_MOVED_TO) {
    if ( Object.keys(data).length &&
      data.cookie === event.cookie) {
      console.log(type + ' moved to ' + data.type);
      data = {};
    }
  }
};

module.exports = {
  configure: function() {
    const tmp_dir = {
      // Change this for a valid directory in your machine.
      path:      '/tmp',
      watch_for: Inotify.IN_MODIFY | Inotify.IN_CREATE | Inotify.IN_DELETE,
      callback:  callback
    };

    console.log('here');

    const tmp_watch_descriptor = inotify.addWatch(tmp_dir);
    console.log(tmp_watch_descriptor);
  }
};
