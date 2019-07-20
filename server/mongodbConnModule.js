var mongoose = require('mongoose');



module.exports._connect = function() {
    mongoose.connect('mongodb://localhost:27017/sortingAppDB', { useNewUrlParser: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log("connected");
    });
    return db;
}
