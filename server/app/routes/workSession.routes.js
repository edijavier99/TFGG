module.exports = app => {
  const workSessions = require("../controllers/workSession.controller.js");

  var router = require("express").Router();

  // Crear una nueva sesión de trabajo (Clock In)
  router.post("/clock-in", workSessions.create);

  // Actualizar una sesión de trabajo existente (Clock Out)
  router.post("/clock-out", workSessions.update);

  // Obtener todas las sesiones de trabajo de un usuario
  router.get("/work-sessions/:userId", workSessions.findAll);

  app.use('/api/test/worksession', router);
};