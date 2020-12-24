import LocalDBConnection from '../singleton/LocalDBConnection';

export default class LocalDBService {
    /**
     * request to create the required DB tables
     * @param {Array} tableQuery needs to send an array with {name: <name>,
     * columns: [{name: <name>, dataType: <TEXT|INTEGER|BLOB>, isUnique: <true|false>, isPrimaryKey: <true|false>, shouldNotAllowNull: <true|false>}]}
     * format
     * @param {*} callBack callback function to invoke after execution finished
     */
    static createDBTables = (tableQuery, callBack) => {
        try {
            const dbConnection = LocalDBConnection.getDBConnection();

            dbConnection.transaction((tx) => {
                tableQuery.forEach(table => {
                    const queryString = LocalDBService._createTableMakeQueryString(table);
                    tx.executeSql(queryString, [], (tx, response) => {
                        console.log(`create table success ${table.name}: `, response);
                    }, (tx, error) => {
                        console.log(`create table error ${table.name}: `, error);
                    })
                });
            }, error => {
                console.log('table create query transaction failed: ', error);
                callBack(null, error);//notify caller
            }, success => {
                console.log('table create query transaction success: ', success);
                callBack(success ?? 'success', null);//notify caller
            });
        } catch (error) {
            console.log('table create query execution failed: ', error);
            callBack(null, error);//notify caller
        }
    }

    /**
     * insert given data to the given DB table
     * @param {Array} data data to be instered to the local DB. this data array should be in this format
     * [{table: <tableName>, columns: '<columnName>, <columnName>', values: '<?>,<?>...', params: [value1, value2, ...]}]
     * @param {*} callBack callback function to invoke after execution finished
     */
    static insertData = (data, callBack) => {
        try {
            const dbConnection = LocalDBConnection.getDBConnection();

            dbConnection.transaction((tx) => {
                data.forEach(table => {
                    //make query
                    let queryString = `INSERT INTO ${table.table} (${table.columns}) VALUES (${table.values})`;

                    tx.executeSql(queryString, table.params, (tx, response) => {
                        console.log(`insert data success ${table.name}: `, response);
                    }, (tx, error) => {
                        console.log(`insert data error ${table.name}: `, error);
                    })
                });
            }, error => {
                console.log('insert data query transaction failed: ', error);
                callBack(null, error);//notify caller
            }, success => {
                console.log('insert data query transaction success: ', success);
                callBack(success ?? 'success', null);//notify caller
            });
        } catch (error) {
            console.log('insert data error: ', data);
            callBack(null, error);//notify caller
        }
    }

    /**
     * update given data in the given DB table
     * @param {Array} data data to be instered to the local DB. this data array should be in this format
     * [{table: <tableName>, query: '<columnName>=?, <columnName>=? WHERE <where=?>', params: [value1, value2, ...]}]
     * @param {*} callBack callback function to invoke after execution finished
     */
    static updateData = (data, callBack) => {
        try {
            const dbConnection = LocalDBConnection.getDBConnection();

            dbConnection.transaction((tx) => {
                data.forEach(table => {
                    //make query
                    let queryString = `UPDATE ${table.table} SET ${table.query}`;

                    tx.executeSql(queryString, table.params, (tx, response) => {
                        console.log(`update data success ${table.name}: `, response);
                    }, (tx, error) => {
                        console.log(`update data error ${table.name}: `, error);
                    })
                });
            }, error => {
                console.log('update data query transaction failed: ', error);
                callBack(null, error);//notify caller
            }, success => {
                console.log('update data query transaction success: ', success);
                callBack(success ?? 'success', null);//notify caller
            });
        } catch (error) {
            console.log('update data error: ', data);
            callBack(null, error);//notify caller
        }
    }

    /**
     * delete given data in the given DB table
     * @param {Array} data data to be instered to the local DB. this data array should be in this format
     * [{table: <tableName>, query: 'WHERE <where=?>', params: [value1, value2, ...]}]
     * @param {*} callBack callback function to invoke after execution finished
     */
    static deleteData = (data, callBack) => {
        try {
            const dbConnection = LocalDBConnection.getDBConnection();

            dbConnection.transaction((tx) => {
                data.forEach(table => {
                    //make query
                    let queryString = `DELETE FROM ${table.table} ${table.query}`;

                    tx.executeSql(queryString, table.params, (tx, response) => {
                        console.log(`delete data success ${table.name}: `, response);
                    }, (tx, error) => {
                        console.log(`delete data error ${table.name}: `, error);
                    })
                });
            }, error => {
                console.log('delete data query transaction failed: ', error);
                callBack(null, error);//notify caller
            }, success => {
                console.log('delete data query transaction success: ', success);
                callBack(success ?? 'success', null);//notify caller
            });
        } catch (error) {
            console.log('delete data error: ', data);
            callBack(null, error);//notify caller
        }
    }

    /**
     * search given data in the given DB table
     * @param {String} query search query
     * @param {Array} params search query parameters
     * @param {*} callBack callback function to invoke after execution finished
     */
    static searchData = (query, params, callBack) => {
        try {
            const dbConnection = LocalDBConnection.getDBConnection();

            dbConnection.executeSql(query, params, (tx, response) => {
                if (tx && tx.rows && tx.rows.raw()) {
                    console.log(`search data : `, tx.rows.raw());
                    return callBack(tx.rows.raw(), null);//notify caller
                }

                callBack(null, error);//notify caller
                console.log(`search data error : `, 'no data');
            }, (tx, error) => {
                callBack(null, error);//notify caller
                console.log(`search data error : `, error);
            });
        } catch (error) {
            console.log('search data error: ', data);
            callBack(null, error);//notify caller
        }
    }

    /**
     * execute any query
     * @param {String} query query
     * @param {Array} params query parameters
     * @param {*} callBack callback function to invoke after execution finished
     */
    static executeQuery = (query, params, callBack) => {
        try {
            const dbConnection = LocalDBConnection.getDBConnection();

            dbConnection.executeSql(query, params, (tx, response) => {
                if (tx) {
                    console.log(`query data : `, tx);
                    return callBack(tx, null);//notify caller
                }

                callBack(null, error);//notify caller
                console.log(`query data error : `, 'no data');
            }, (tx, error) => {
                callBack(null, error);//notify caller
                console.log(`query data error : `, error);
            });
        } catch (error) {
            console.log('query data error: ', data);
            callBack(null, error);//notify caller
        }
    }

    /**
     * create and return query string form user provided query array
     */
    static _createTableMakeQueryString = (tableQuery) => {
        try {
            let query = `CREATE TABLE IF NOT EXISTS ${tableQuery.name} (`;
            let count = 0;
            tableQuery.columns.forEach(column => {
                query += `${column.name} ${column.dataType} ${(column.isPrimaryKey
                    ? 'PRIMARY KEY AUTOINCREMENT' : '')} ${(column.isUnique
                        ? 'UNIQUE' : '')} ${(column.shouldNotAllowNull
                            ? 'NOT NULL' : '')}${count < tableQuery.columns.length - 1 ? ',' : ''}`;
                count++;
            });
            query += '); ';

            return query;
        } catch (error) {
            console.log('query string creation failed: ', error);
        }

        return null;
    }
}