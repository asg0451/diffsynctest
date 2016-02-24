var SqliteDataAdapter = function(database){
    if(!database){ throw new Error('Need to specify a database'); }
    this.database = database;
    console.log('database: ' + database);
};

SqliteDataAdapter.prototype.getData = function(id, callback){
    // uses sequelize. this.database = Doc.
    console.log('getting data: ' + id);
    var doc = this.database;
    doc.findOne({
        where: {
            _id: id
        }
    }).then(function(data) {
        if(!data) {
            console.log('creating entry with id: ' + id);
            doc.create({
                _id: id
            }).then(newData => {
                console.log('newdata: ' + JSON.stringify(newData, null, 4));
                callback(null, {textValue: newData.textValue});
            });
        }
        else {
            console.log('found entry: ' + JSON.stringify(data, null, 4));
            callback(null, data); // i guess
        }
    });

};

SqliteDataAdapter.prototype.storeData = function(id, data, callback){
    // we override the document in any way
    //    delete data._rev;
    console.log('storing data with id ' + id + ': '+ JSON.stringify(data, null, 4));

    var doc = this.database;
    var tv = data.textValue;
    var retval = {};

//    override the document with the current state
    doc.update({
        textValue: tv
    }, {
        where: {
            _id: id
        }
    }).then(data => callback(null, data));

    return true;
};

module.exports = SqliteDataAdapter;
