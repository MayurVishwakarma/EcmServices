const mysql = require('mysql');
const mssql = require('mssql');

// MySQL configuration
const db = mysql.createConnection({
  host: '65.21.7.252',
  user: 'dba',
  password: 'Sapl@2023',
  database: 'USPL_DEV'
});

// MSSQL configuration
const sqlConfig = {
  server: 'ecm.seprojects.in',
  user: 'sa',
  password: 'sapl@1234',
  database: 'WMSProjects',
  options: {
    encrypt: true,
    trustServerCertificate: true // Use this if you're connecting to a self-signed certificate
  }
};

// Connect to MSSQL
let poolPromise = mssql.connect(sqlConfig).then(pool => {
  console.log("Connected to MSSQL");
  return pool;
}).catch(e => {
  console.log("MSSQL Connection Error: ", e);
});

class User {
  // New method to call the stored procedure in MSSQL
  static async getAllUser(callback) {
    try {
      const pool = await poolPromise;
      const request = pool.request();
      const result = await request.execute('SAF_GetAllECMUsersList');
      callback(null, result.recordset);
    } catch (err) {
      console.log('MSSQL Query Error: ', err);
      callback(err, null);
    }
  }

  static async getProjectListForUser(userId, callback) {
    try {
      const pool = await poolPromise;
      const request = pool.request();
      // Add the UserId parameter
      request.input('UserId', mssql.Int, userId);
      // Execute the stored procedure
      const result = await request.execute('SAF_GetAllECMProjectForUser');
      callback(null, result.recordset);
    } catch (err) {
      console.log('MSSQL Query Error: ', err);
      callback(err, null);
    }
  }

  static getUserById(id, callback) {
    const sqlQuery = `SELECT * FROM tbl_User WHERE UserId = ${id}`;
    db.query(sqlQuery, (err, result) => {
      if (err) throw err;
      callback(result[0]);
    });
  }

  static addUser(name, description, callback) {
    const sqlQuery = `INSERT INTO tbl_User (FirstName, LastName) VALUES ('${name}', '${description}')`;
    db.query(sqlQuery, callback);
  }

  static updateUser(id, name, description, callback) {
    const sqlQuery = `UPDATE tbl_User SET FirstName = '${name}', LastName = '${description}' WHERE UserId = ${id}`;
    db.query(sqlQuery, callback);
  }

  static deleteUser(id, callback) {
    const sqlQuery = `DELETE FROM tbl_User WHERE UserId = ${id}`;
    db.query(sqlQuery, callback);
  }


}

module.exports = User;
