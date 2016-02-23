////////// diffsync stuff

var diffSyncStuff = function(app) {

    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    // setting up diffsync's DataAdapter
    var diffSync    = require('diffsync');
    var dataAdapter = new diffSync.InMemoryDataAdapter();

    // setting up the diffsync server
    var diffSyncServer = new diffSync.Server(dataAdapter, io);

    // starting the http server
    http.listen(4000, function(){
        console.log('ready to go');
    });

    return dataAdapter; // for outside access

};

// test
setInterval(function() {
    diffSyncSetupAdapter.getData('pooptest', function(err, data){
        if(!err)
            console.log("data is: " + JSON.stringify(data));
        else
            console.log('data err: ' + JSON.stringify(err));
    });
},10000);

module.exports = diffSyncStuff;
