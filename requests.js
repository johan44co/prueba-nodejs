var Request = require('tedious').Request;
// var TYPES = require('tedious').TYPES;

module.exports = (connection) => {
    return (query) => new Promise((resolve, reject) => {

        request = new Request(query, (err) => {
            if (err) {
                reject(err);
            }
        });

        const result = []
        request.on('row', (columns) => {
            const obj = {}
            columns.map(element => {
                let key
                if (element.metadata.colName === 'ProductID') {
                    key = 'id'
                } else {
                    key = element.metadata.colName.charAt(0).toLowerCase() + element.metadata.colName.slice(1);
                }
                obj[key] = isNaN(Number(element.value)) || isFinite(element.value) === false ? unescape(element.value) : Number(element.value)
            });
            result.push(obj)
        });

        request.on('requestCompleted', () => {
            resolve(result)
        })

        connection.execSql(request);
    })

}