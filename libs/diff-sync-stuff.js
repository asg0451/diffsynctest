////////// diffsync stuff

var diffSyncStuff = function(app, adapter, db) {

  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  var diffSync    = require('diffsync');

  // if(!adapter) {
  var dataAdapter = new diffSync.InMemoryDataAdapter();
  // } else {
  //     var dataAdapter = new adapter(db);
  // }

  // setting up the diffsync server
  var diffSyncServer = new diffSync.Server(dataAdapter, io);

  // starting the http server
  http.listen(4000, function(){
    console.log('ready to go');
  });

  setInterval(testSync.bind(null, dataAdapter), 2000);


  return dataAdapter; // for outside access

};

var testSync = function(memAdapter) {
  var cache = memAdapter.cache;

  // for each id hopefully
  for (var key in cache) {
    if (Object.prototype.hasOwnProperty.call(cache, key)) {
      var data = cache[key];
      console.log(key, data);
    }
  }
}

module.exports = diffSyncStuff;
