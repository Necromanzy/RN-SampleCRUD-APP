/**
 * @author Shanilka
 */
import SQLite from 'react-native-sqlite-storage';
import LocalDBService from '../services/LocalDBService';

class LocalDBConnection {
    constructor() {
        this.databaseConnection = null;
        this.connectionAttempts = 1;
    }

    /**
     * open a new sqlite DB connection
     */
    createDBConnection = () => {
        this.databaseConnection = SQLite.openDatabase({ name: 'pristine.db', location: 'default' },
            () => {//connection success
                this.connectionAttempts = 1;
                console.log('local db connection open successfully');

                LocalDBService.createDBTables([
                    {
                        name: 'customer',
                        columns: [
                            { name: 'ID', dataType: 'INTEGER', isUnique: true, isPrimaryKey: true, shouldNotAllowNull: true },
                            { name: 'firstName', dataType: 'TEXT', isUnique: false, isPrimaryKey: false, shouldNotAllowNull: true },
                            { name: 'lastName', dataType: 'TEXT', isUnique: false, isPrimaryKey: false, shouldNotAllowNull: true },
                            { name: 'email', dataType: 'TEXT', isUnique: false, isPrimaryKey: false, shouldNotAllowNull: false },
                            { name: 'address', dataType: 'TEXT', isUnique: false, isPrimaryKey: false, shouldNotAllowNull: false },
                            { name: 'city', dataType: 'TEXT', isUnique: false, isPrimaryKey: false, shouldNotAllowNull: false },
                            { name: 'state', dataType: 'TEXT', isUnique: false, isPrimaryKey: false, shouldNotAllowNull: false },
                            { name: 'zip', dataType: 'TEXT', isUnique: false, isPrimaryKey: false, shouldNotAllowNull: false },
                            { name: 'phone', dataType: 'TEXT', isUnique: false, isPrimaryKey: false, shouldNotAllowNull: false },
                            { name: 'mobile', dataType: 'TEXT', isUnique: false, isPrimaryKey: false, shouldNotAllowNull: false },
                            { name: 'dob', dataType: 'TEXT', isUnique: false, isPrimaryKey: false, shouldNotAllowNull: false },
                        ]
                    },
                    {
                        name: 'contacts',
                        columns: [
                            { name: 'ID', dataType: 'INTEGER', isUnique: true, isPrimaryKey: true, shouldNotAllowNull: true },
                            { name: 'customerId', dataType: 'INTEGER', isUnique: false, isPrimaryKey: false, shouldNotAllowNull: true },
                            { name: 'title', dataType: 'TEXT', isUnique: false, isPrimaryKey: false, shouldNotAllowNull: true },
                            { name: 'contact', dataType: 'TEXT', isUnique: false, isPrimaryKey: false, shouldNotAllowNull: true }
                        ]
                    },
                ],
                    (response, error) => {
                        if (response && (error == undefined || error == null)) {

                        }
                    });

            }, () => {
                console.log('local db connection open failed');
                setTimeout(() => {
                    this.createDBConnection();
                }, 1500 * this.connectionAttempts);
            });
    }

    /**
     * return the created DB connection
     */
    getDBConnection = () => this.databaseConnection;
}

export default new LocalDBConnection();