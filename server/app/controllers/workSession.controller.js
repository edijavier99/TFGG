const db = require("../models");
const WorkSession = db.workSession;

// Crear y guardar una nueva sesión de trabajo (Clock In)
exports.create = (req, res) => {
  const { userId } = req.body;

  const newSession = {
    userId,
    clockInTime: new Date()
  };

  WorkSession.create(newSession)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear la sesión de trabajo."
      });
    });
};

// Actualizar una sesión de trabajo existente (Clock Out)
exports.update = (req, res) => {
  const { userId } = req.body;

  WorkSession.findOne({
    where: {
      userId,
      clockOutTime: null
    }
  })
    .then(session => {
      if (!session) {
        return res.status(404).send({
          message: "No se encontró una sesión activa para el usuario."
        });
      }

      session.clockOutTime = new Date();
      session.totalTime = (session.clockOutTime - session.clockInTime) / 1000 / 60 / 60; // Convertir a horas

      session.save()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Ocurrió un error al actualizar la sesión de trabajo."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al buscar la sesión de trabajo."
      });
    });
};

// Obtener todas las sesiones de trabajo de un usuario
exports.findAll = (req, res) => {
  const { userId } = req.params;

  WorkSession.findAll({ where: { userId } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar las sesiones de trabajo."
      });
    });
};