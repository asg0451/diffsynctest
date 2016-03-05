var modelInfo = require('../models/ds-model.js');

var SqliteDataAdapter = function(database){
    if(!database){ throw new Error('Need to specify a database'); }
    this.database = database;
    console.log('database: ' + database);
};

SqliteDataAdapter.prototype.getData = function(id, callback){
    // uses sequelize. this.database = our from database.js
    console.log('getting data: ' + id);
    var doc = this.database;
    doc.findOne({
        where: {
            _id: id
        }
    }).then(function(data) {
        if(!data) {
            console.log('entry not found. adding entry with id: ' + id);
            doc.create({
                _id: id
            }).then(newData => {
                console.log('new entry: ' + JSON.stringify(newData, null, 4));
                var syncObj = {};
                for(f of modelInfo.fields) {
                    if(newData.hasOwnProperty(f)) {
                        syncObj[f] = newData[f];
                    }
                }
                callback(null, syncObj);
            });
        }
        else {
            console.log('found entry: ' + JSON.stringify(data, null, 4));
            callback(null, data); // no error checking right now...
        }
    });

};

SqliteDataAdapter.prototype.storeData = function(id, data, callback){
    console.log('storing data with id ' + id + ': '+ JSON.stringify(data, null, 4));

    var doc = this.database;

    var updateObj = {};
    for(f of modelInfo.fields) {
        if(data.hasOwnProperty(f)) { // only update things data actually has (bad idea?)
            console.log('updating '+ f);
            updateObj[f] = data[f];
        }
    }

    console.log('updating fields of ' + id + ': ' + JSON.stringify(updateObj, null, 4));

//    override the document with the current state
    doc.update(updateObj, {
        where: {
            _id: id
        }
    }).then(data => callback(null, data));

    return true;
};

module.exports = SqliteDataAdapter;
