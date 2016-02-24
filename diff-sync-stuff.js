////////// diffsync stuff

var diffSyncStuff = function(app, adapter, db) {

    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    // setting up diffsync's DataAdapter
    var diffSync    = require('diffsync');

    console.log('adapter: ' + adapter);

    if(!adapter) {
        console.log('im adapter');
        var dataAdapter = new diffSync.InMemoryDataAdapter();
    } else {
        console.log('myadapter');
        var dataAdapter = new adapter(db);
        console.log(dataAdapter);
    }

//    var dataAdapter = new diffSync.InMemoryDataAdapter();

    // setting up the diffsync server
    var diffSyncServer = new diffSync.Server(dataAdapter, io);

    // starting the http server
    http.listen(4000, function(){
        console.log('ready to go');
    });

//    test
    setInterval(function() {
        dataAdapter.getData('pooptest', function(err, data){
            if(!err)
                console.log("data is: " + JSON.stringify(data));
            else
                console.log('data err: ' +  + JSON.stringify(err));
        });
    },10000);


    return dataAdapter; // for outside access

};

module.exports = diffSyncStuff;
