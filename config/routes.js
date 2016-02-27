module.exports = function routes() {
  this.namespace('api', function() {
    this.resource('users');
    this.match('auth', 'users#auth', { via: [ 'POST', 'DELETE' ]});
  });

  this.root('pages#index');
};
