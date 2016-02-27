var _ = require('lodash');
var Path = require('path');

module.exports = function(options) {
  options = _.extend({
    path: __dirname
  }, options || {});

  return function(req, res, cb) {
    // @TODO refactor to support non-unix FS
    var path = Path.join(options.path, req.path) + '.swig';
    res.render(path, function(err, html) {
      if (err) res.status(404);
      else res.type('text/ng-template').send(html);
      cb();
    });
  };
};
