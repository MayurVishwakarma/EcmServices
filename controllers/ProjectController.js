// ProjectController.js
const Project = require('../models/ProjectModel');

exports.getAllusers = (req, res) => {
  Project.getAllUsers((err, result) => {
    if (err) throw err;
    res.json(result);

  });
};
exports.getUserByName = (req, res) => {
  const id = req.params.id;
  Project.getUserbyName(id, (result) => {
    res.json(result);
  });
};

exports.getOmsDetails = (req, res) => {
  Project.getOmdDetails(res, (result) => {
    res.json(result);
  })
};

// exports.addProject = (req, res) => {
//   const { name, description } = req.body;
//   Project.addProject(name, description, () => {
//     res.send('Item added');
//   });
// };

// exports.updateProject = (req, res) => {
//   const id = req.params.id;
//   const { name, description } = req.body;
//   Project.updateProject(id, name, description, () => {
//     res.send('Item updated');
//   });
// };

// exports.deleteProject = (req, res) => {
//   const id = req.params.id;
//   Project.deleteProject(id, () => {
//     res.send('Project deleted');
//   });

// };
