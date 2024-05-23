const db = require("../models");
const Reservation = db.reservation;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.date || !req.body.time || !req.body.guests) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!"
    });
    return;
  }

  const reservation = {
    name: req.body.name,
    email: req.body.email,
    date: req.body.date,
    time: req.body.time,
    guests: req.body.guests
  };

  Reservation.create(reservation)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear la reserva."
      });
    });
};

exports.getAllReservations = (req, res) => {
  Reservation.findAll()
    .then(reservations => {
      res.status(200).send(reservations);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving reservations."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Reservation.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Reserva eliminada con éxito."
      });
    } else {
      res.send({
        message: `No se puede eliminar la reserva con id=${id}. Tal vez no se encontró la reserva.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "No se pudo eliminar la reserva con id=" + id
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Reservation.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Reserva actualizada con éxito."
      });
    } else {
      res.send({
        message: `No se puede actualizar la reserva con id=${id}. Tal vez no se encontró la reserva o el cuerpo de la solicitud está vacío.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error al actualizar la reserva con id=" + id
    });
  });
};