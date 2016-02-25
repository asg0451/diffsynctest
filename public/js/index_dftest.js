var defaultId = 'pooptest';

var DiffSyncClient = diffsync.Client || require('diffsync').Client
var socket = window.io || require('socket.io-client')

var client;

var startSync = function () {
    if(!client) {
        var id = document.getElementById('dsIdEntry').value;

        client = new DiffSyncClient(socket('http://' + window.location.hostname + ':4000'), id);

        client.on('connected', function(){
            // the initial data has been loaded,
            // you can initialize your application
            if(!textarea) textarea = document.getElementById('dataArea');
            data = client.getData();
            console.log('connected');
        });

        client.on('synced', function(){
            // an update from the server has been applied
            // you can perform the updates in your application now
            if(!textarea) textarea = document.getElementById('dataArea');
            textarea.value = data.textValue;
        });

        client.initialize();
    }
}


var data = {};

var textarea;

var syncTextArea = function() {
    if(!client) return;
    if(!textarea) textarea = document.getElementById('dataArea');
    data.textValue = textarea.value;
    client.sync();
}

setInterval(syncTextArea, 5000);

document.onload = function() {
    data = {
        textValue: 'init'
    };
    textarea = document.getElementById('dataArea');
};
