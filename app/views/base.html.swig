<!DOCTYPE html>
<html>
  <head>
    <title><% block title %><%= title %><% endblock %></title>
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="/css/app.css" />
  </head>
  <body>
    <div class="container" ui-view=""></div>
  </body>
  <script type="text/javascript" src="/js/vendor.js"></script>
  <script type="text/javascript" src="/js/app.js"></script>
</html>
