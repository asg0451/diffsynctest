////////// diffsync stuff

var diffSyncStuff = function(app, adapter, db) {

    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    // setting up diffsync's DataAdapter
    var diffSync    = require('diffsync');

    if(!adapter) {
        var dataAdapter = new diffSync.InMemoryDataAdapter();
    } else {
        var dataAdapter = new adapter(db);
    }

    // setting up the diffsync server
    var diffSyncServer = new diffSync.Server(dataAdapter, io);

    // starting the http server
    http.listen(4000, function(){
        console.log('ready to go');
    });

    return dataAdapter; // for outside access

};

module.exports = diffSyncStuff;
