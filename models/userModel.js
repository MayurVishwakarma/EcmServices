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
// Validate input data
function validateUserData(data) {
  const { firstname, lastname, mobile, email, loginId, password, user_type } = data;
  if (!firstname || !lastname || !mobile || !email || !loginId || !password || !user_type) {
    throw new Error('Missing required user data fields');
  }
}

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

  static async createNewUserForECM(req, callback) {
    try {
      console.log(req.body);

      // Validate input data
      validateUserData(req.body);

      const pool = await poolPromise;
      const request = pool.request();

      // Add the UserId parameter
      request.input('FirstName', mssql.VarChar, req.body.firstname);
      request.input('LastName', mssql.VarChar, req.body.lastname);
      request.input('MobileNumber', mssql.VarChar, req.body.mobile);
      request.input('EmailAddress', mssql.VarChar, req.body.email);
      request.input('LoginId', mssql.VarChar, req.body.loginId);
      request.input('Password', mssql.VarChar, req.body.password);
      request.input('User_Type', mssql.VarChar, req.body.user_type);

      // Execute the stored procedure
      const result = await request.execute('SAF_CreateNewUserForECM');
      console.log(result);

      callback(result.recordset);
    } catch (err) {
      console.error('MSSQL Query Error:', err);
      callback(err, null);
    }
  }

  static async assignEcmProjectToUser(req, callback) {
    try {
      console.log(req.body);
      // Validate input data
      // validateUserData(req.body);
      const pool = await poolPromise;
      const request = pool.request();
      // Add the UserId parameter
      request.input('UserId', mssql.Int, req.body.userId);
      request.input('ProjectId', mssql.VarChar, req.body.projectId);
      // Execute the stored procedure
      const result = await request.execute('SAF_AssignECMProjectToUser');
      console.log(result);
      callback(result.recordset);
    } catch (err) {
      console.error('MSSQL Query Error:', err);
      callback(err, null);
    }
  }

  static async deleteUserFromECM(userId, callback) {
    try {

      const pool = await poolPromise;
      const request = pool.request();
      // Add the UserId parameter
      request.input('UserId', mssql.Int, userId);

      // Execute the stored procedure
      const result = await request.execute('SAF_DeleteUserFromECM');
      console.log(result);
      callback(null, result.recordset);
    } catch (err) {
      console.error('MSSQL Query Error:', err);
      callback(err, null);
    }
  }

  static async updateEcmUser(req, callback) {
    try {

      const pool = await poolPromise;
      const request = pool.request();
      // Add the UserId parameter
      request.input('UserId', mssql.Int, req.body.userId);
      request.input('FirstName', mssql.VarChar, req.body.firstname);
      request.input('LastName', mssql.VarChar, req.body.lastname);
      request.input('MobileNumber', mssql.VarChar, req.body.mobile);
      request.input('EmailAddress', mssql.VarChar, req.body.email);
      request.input('LoginId', mssql.VarChar, req.body.loginId);
      request.input('Password', mssql.VarChar, req.body.password);
      request.input('User_Type', mssql.VarChar, req.body.user_type);
      // Execute the stored procedure
      const result = await request.execute('SAF_UpdateEcmUser');
      console.log(result);
      callback(result.recordset);
    } catch (err) {
      console.error('MSSQL Query Error:', err);
      callback(err, null);
    }
  }

  static async getAllProjects(callback) {
    try {
      const pool = await poolPromise;
      const request = pool.request();
      const result = await request.execute('SAF_getProject');
      callback(null, result.recordset);
    } catch (err) {
      console.log('MSSQL Query Error: ', err);
      callback(err, null);
    }
  }

  // static getUserById(id, callback) {
  //   const sqlQuery = `SELECT * FROM tbl_User WHERE UserId = ${id}`;
  //   db.query(sqlQuery, (err, result) => {
  //     if (err) throw err;
  //     callback(result[0]);
  //   });
  // }

  // static addUser(name, description, callback) {
  //   const sqlQuery = `INSERT INTO tbl_User (FirstName, LastName) VALUES ('${name}', '${description}')`;
  //   db.query(sqlQuery, callback);
  // }

  // static updateUser(id, name, description, callback) {
  //   const sqlQuery = `UPDATE tbl_User SET FirstName = '${name}', LastName = '${description}' WHERE UserId = ${id}`;
  //   db.query(sqlQuery, callback);
  // }

  // static deleteUser(id, callback) {
  //   const sqlQuery = `DELETE FROM tbl_User WHERE UserId = ${id}`;
  //   db.query(sqlQuery, callback);
  // }


}

module.exports = User;
