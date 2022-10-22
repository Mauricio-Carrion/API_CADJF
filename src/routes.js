const express = require('express');
const router = express.Router();

const cadGetController = require('./controllers/cadGetController');
const cadPostController = require('./controllers/cadPostController');

//GET
router.get('/clientes', cadGetController.getAllClients);
router.get('/cliente/:codigo', cadGetController.getClient);
router.get('/visitas', cadGetController.getAllVisits);
router.get('/visita/:codigo', cadGetController.getVisit);
router.get('/usuarios', cadGetController.getAllUsers);
router.get('/usuario/:codigo', cadGetController.getUser);
router.get('/visita_cliente/:codigo', cadGetController.getVisitsByClient);
router.get('/cliente_usuario/:codigo', cadGetController.getClientsByUser);

//POST
router.post('/usuarios', cadPostController.postUser);
router.post('/clientes', cadPostController.postClient);




module.exports = router;