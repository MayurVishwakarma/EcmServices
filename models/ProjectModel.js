// userModel.js
const mysql = require('mysql');

const db = mysql.createConnection({
  host: '13.232.191.57',
  user: 'sipladmin',
  password: 'Sipl@123!',
  database: 'kundalia_lbc'
});



db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Project Model Found');
});

class Projects {
  static getAllUsers(callback) {
    const sql = 'SELECT * FROM tbl_user';
    db.query(sql, callback);
  }

  static getUserbyName(name, callback) {
    const sql = `SELECT * FROM tbl_user WHERE firstname = ${name}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      callback(result[0]);
    });
  }

  static getOmdDetails(res, callback) {
    console.log(req.body);
    dbConn.query(
      "call SAF_OMSDisplayList(?,?,?,?,?,?,?,?)",
      [
        req.body.chakNo,
        req.body.areaId,
        req.body.DistributoryId,
        req.body.OmsStatus,
        req.body.DamageStaus,
        req.body.ListStatus,
        req.body.PageIndex,
        req.body.PageLimit,

      ],
      function (err, result) {
        if (err) {
          console.error(err);
          callback(result[0]);
          res.json({ status: "Stored procedure error", data: { err } });
        }
        dbConn.release();
        if (result.length) {
          if (result.length > 0) {
            res.json({ status: "Success", data: result[0] });
          }
        } else {
          res.json({ status: "Error", data: { error: "No record found" } });
        }
      }
    );




  }

  // static addProject(name, description, callback) {
  //   const sql = `INSERT INTO tbl_Project (FirstName, LastName) VALUES ('${name}', '${description}')`;
  //   db.query(sql, callback);
  // }

  // static updateProject(id, name, description, callback) {
  //   const sql = `UPDATE tbl_Project SET FirstName = '${name}', LastName = '${description}' WHERE ProjectId = ${id}`;
  //   db.query(sql, callback);
  // }

  // static deleteProject(id, callback) {
  //   const sql = `DELETE FROM tbl_Project WHERE ProjectId = ${id}`;
  //   db.query(sql, callback);
  // }

}

module.exports = Projects;
