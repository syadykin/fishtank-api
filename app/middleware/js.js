var _          = require('lodash');
var a$         = require('async');
var Browserify = require('browserify');
var Ccify      = require('configurify');
var Fs         = require('fs');
var Path       = require('path');

var compiled = {};

module.exports = function(root, options) {
  options = _.extend({}, {
    files: {}
  }, options || {});

  var src = Path.join(root, options.src);

  function compile(file, options, cb) {
    var b = Browserify({
          basedir: src,
          paths: src,
          noParse: options.parse === false
        }),
        files = [];

    b.transform(Ccify, {'pattern': '**/*.conf'});
    b.add(options.files);
    b.external(options.external);

    _.each(options.require, function(name, req) {
      b.require(req, {
        expose: name
      });
    });

    b.on('file', function(file) {
      files.push(file);
    });

    b.bundle(function(err, buffer) {
      if (err) return cb(err);
      Fs.writeFile(file, buffer, function(err) {
        cb(err, files);
      });
    });
  }

  return function(req, res, cb) {
    if (req.method !== 'GET' &&
        req.method !== 'HEAD' ||
        !(req.path in options.files)) return cb();

    var config = _.extend({}, {
          require: {},
          files: [],
          external: []
        }, options.files[req.path]),

        file = Path.join(options.dest, req.url);

    a$.waterfall([
      function(cb) {
        Fs.stat(file, function(err, stat) {
          cb(null, stat && +stat.mtime || 0);
        });
      },
      function(mtime, cb) {
        // we don't care about dest mtime if file isn't compiled yet
        if (!(file in compiled)) {
          // do not map files if recompile required
          return cb(null, true);
        }

        a$.map(compiled[file], Fs.stat, function(err, stats) {
          // err means file not found, we must recompile
          cb(null, err || !mtime ||
                    _.some(stats, function(s) { return +s.mtime > mtime; }));
        });
      },
      function(recompile, cb) {
        if (recompile) {
          compile(file, config, cb);
        } else {
          cb(null, false);
        }
      },
      function(files, cb) {
        if (files !== false)
          compiled[file] = files;
        cb();
      }
    ], cb);
  };

};
