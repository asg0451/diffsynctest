var Sequelize = require('sequelize');
var syncModel = {
    textValue: {
        type: Sequelize.STRING,
        defaultValue: 'fillertext2'
    },
    somePath: {
        type: Sequelize.STRING,
        defaultValue: 'poop path'
    },
    someInt: {
        type: Sequelize.INTEGER,
        defaultValue: 42
    },
    _id: { // diffsync id
        type: Sequelize.STRING,
        field: '_id'
    }
};

var getFields = function(model) {
    var fields = [];
    for (var name in model) {
        if (syncModel.hasOwnProperty(name) && name !== '_id') {
            fields.push(name);
        }
    }
    return fields;
}

console.log('model has props: ' + getFields(syncModel));

module.exports = {model: syncModel, fields: getFields(syncModel)};
