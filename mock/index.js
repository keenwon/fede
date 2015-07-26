module.exports = function (app) {

    // pages
    app.get('/', function (req, res) {
        res.render('index');
    });

    // apis
    app.get('/json', function(req,res){
        res.json({ user: 'json' });
    });

    app.get('/jsonp', function(req,res){
        res.jsonp({ user: 'jsonp' });
    });

};