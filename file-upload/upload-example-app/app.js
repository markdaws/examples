
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


app.post('/api/photos', function(req, res) {

    var serverPath = '/images/' + req.files.userPhoto.name;

    require('fs').rename(
        req.files.userPhoto.path,
        '/Users/mark/code/examples/file-upload/upload-example-app/public' + serverPath,
        function(error) {

            res.contentType('text/plain');

            if(error) {
                res.send(JSON.stringify({
                    error: 'Ah crap! Something bad happened'
                }));
                return;
            }
            
            res.send(JSON.stringify({
                path: serverPath
            }));
        }
    );
});