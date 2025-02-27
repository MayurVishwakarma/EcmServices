// userController.js
const User = require('../models/userModel');



exports.getAllUsers = (req, res) => {
  User.getAllUser((err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

exports.getProjectListForUser = (req, res) => {
  const id = req.params.id;
  User.getProjectListForUser(id, (err, result) => {
    if (err) throw err;
    res.json(result);
  })
};


exports.createNewUserforECM = (req, res) => {
  User.createNewUserForECM(req, (result) => {
    res.json(result);
  })
};

exports.assignEcmProjectToUser = (req, res) => {
  User.assignEcmProjectToUser(req, (result) => {
    res.json(result);
  })
};

exports.deleteUserFromECM = (req, res) => {
  const id = req.params.id;
  User.deleteUserFromECM(id, (err, result) => {
    if (err) throw err;
    res.json(result);
  })
};

exports.updateEcmUser = (req, res) => {
  User.updateEcmUser(req, (result) => {
    res.json(result);
  })
};
exports.getAllProjects = (req, res) => {
  User.getAllProjects((err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

exports.getDesignation = (req, res) => {
  User.getDesignation((err, result) => {
    if (err) throw err;
    res.json(result);
  });
};
// exports.getUserById = (req, res) => {
//   const id = req.params.id;
//   User.getUserById(id, (result) => {
//     res.json(result);
//   });
// };

// exports.addUser = (req, res) => {
//   const { name, description } = req.body;
//   User.addUser(name, description, () => {
//     res.send('Item added');
//   });
// };

// exports.updateUser = (req, res) => {
//   const id = req.params.id;
//   const { name, description } = req.body;
//   User.updateUser(id, name, description, () => {
//     res.send('Item updated');
//   });
// };

// exports.deleteUser = (req, res) => {
//   const id = req.params.id;
//   User.deleteUser(id, () => {
//     res.send('User deleted');
//   });
// };


