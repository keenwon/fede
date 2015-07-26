module.exports = function (app) {

    // apis
    app.get('/json', function(req,res){
        res.json({ user: 'json' });
    });

    app.get('/jsonp', function(req,res){
        res.jsonp({ user: 'jsonp' });
    });

};