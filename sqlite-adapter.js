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
                _id: id,
//                textValue: data.textValue
            }).then(newData => callback(null, {textValue: newData.textValue}));
        }
        else {
            console.log('found entry: ' + JSON.stringify({textValue: data.textValue}));
            callback(null, {textValue: data.textValue}); // i guess
        }
    });

};

SqliteDataAdapter.prototype.storeData = function(id, data, callback){
    // we override the document in any way
    //    delete data._rev;
    console.log('storing data with id ' + id + ': '+ JSON.stringify(data));

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

    // doc.destroy({
    //     where: {
    //         _id: id
    //     }
    // });
    // doc.create({
    //     _id: id,
    //     textValue: tv
    // }).then(function(data) {
    //     callback(null, data);
    // })

    return true;
};

module.exports = SqliteDataAdapter;
