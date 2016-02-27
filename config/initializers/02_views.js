var Consolidate = require('consolidate');
var Swig = require('swig');
var TSwig = require('../../app/middleware/swig');

module.exports = function() {
  var views = this.get('views');

  this.set('view engine', 'swig');
  this.engine('swig', Consolidate.swig);
  Swig.Swig({
    root: views,
    allowErrors: true,
    varControls: ['<%=', '%>'],
    tagControls: ['<%', '%>'],
    cmtControls: ['<#', '#>'],
    cache: false,
    loader: Swig.loaders.fs(views)
  });

  if ('development' === this.env) {
    this.use('/t', TSwig({ path: views }));
  }
};
