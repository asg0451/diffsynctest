var setupDB = function() {
    console.log('setting up db');

    var Sequelize = require('sequelize');
    var sequelize = new Sequelize('dstest', 'miles', 'password', {
        host: 'localhost',
        dialect: 'sqlite',

        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },

        // SQLite only
        storage: './dstest.sqlite'
    });

    var Doc = sequelize.define('doc', {
        textValue: {
            type: Sequelize.STRING,
            defaultValue: 'fillertext'
        },
        _id: { // diffsync id
            type: Sequelize.STRING,
            field: '_id'
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    Doc.sync({force: true}).then(function () {
        //no initial content right now
    });

    return Doc;
}

module.exports = setupDB;
