var id = 'pooptest';

// if installed from standalone script or browserify / webpack
var DiffSyncClient = diffsync.Client || require('diffsync').Client

// socket.io standalone or browserify / webpack
var socket = window.io // || require('socket.io-client')


// pass the connection and the id of the data you want to synchronize
var client = new DiffSyncClient(socket('http://' + window.location.hostname + ':4000'), id);

var data = {};

client.on('connected', function(){
    // the initial data has been loaded,
    // you can initialize your application
    data = client.getData();
    console.log('connected');
});

client.on('synced', function(){
    // an update from the server has been applied
    // you can perform the updates in your application now
    console.log('synced');
    var textarea = document.getElementById('dataArea');
    textarea.value = data.textValue;
});

client.initialize();

var syncTextArea = function() {
    var textarea = document.getElementById('dataArea');
    data.textValue = textarea.value;
    client.sync();
}

document.onload = function() {
    data = {
        textValue: 'init'
    }
};
