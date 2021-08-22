const Connection = require('tedious').Connection;

const config = {
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'test',
            password: 'test'
        }
    },
    options: {
        encrypt: false,
        port: 62648,
        database: 'prueba-nodejs',
        instancename: 'SQLEXPRESS'
    }
};

const connection = new Connection(config);
connection.connect();

module.exports = connection