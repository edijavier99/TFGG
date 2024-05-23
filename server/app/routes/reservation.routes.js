module.exports = app => {
  const reservations = require("../controllers/reservation.controller.js");

  var router = require("express").Router();

  // Crear una nueva reserva
  router.post("/", reservations.create);

  // Obtener todas las reservas
  router.get("/", reservations.getAllReservations);

  // Eliminar una reserva por ID
  router.delete("/:id", reservations.delete);

  // Actualizar una reserva por ID
  router.put("/:id", reservations.update);

  app.use('/api/test/reservations', router);
};