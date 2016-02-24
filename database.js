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
//            allowNull: false,
            defaultValue: 'fillertext'
//            field: 'textValue' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        _id: { // diffsync id
            type: Sequelize.STRING,
            field: '_id'
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
    });

    Doc.sync({force: true}).then(function () {
        // return Doc.create({
        //     contents: 'initialcontent',
        //     _id: 'pooptest'
        // });
    });

    return Doc;
}

module.exports = setupDB;
