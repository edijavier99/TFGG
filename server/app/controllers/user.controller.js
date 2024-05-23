const db = require("../models");
const User = db.user;


exports.allAccess = (req, res) => {
  res.status(200).send("Reservas");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


exports.updateProfile = (req, res) => {
  const { id, image } = req.body;

  User.update({ image }, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Profile was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating User with id=" + id
    });
  });
};

exports.getUserProfile = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};