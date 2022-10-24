const express = require('express');
const router = express.Router();

const cadGetController = require('./controllers/cadGetController');
const cadPostController = require('./controllers/cadPostController');
const cadPutController = require('./controllers/cadPutController');
const cadDeleteController = require('./controllers/cadDeleteController');

//GET
router.get('/usuarios', cadGetController.getAllUsers);
router.get('/usuario/:codigo', cadGetController.getUser);
router.get('/clientes', cadGetController.getAllClients);
router.get('/cliente/:codigo', cadGetController.getClient);
router.get('/visitas', cadGetController.getAllVisits);
router.get('/visita/:codigo', cadGetController.getVisit);
router.get('/visita_cliente/:codigo', cadGetController.getVisitsByClient);
router.get('/cliente_usuario/:codigo', cadGetController.getClientsByUser);

//POST
router.post('/usuarios', cadPostController.postUser);
router.post('/clientes', cadPostController.postClient);
router.post('/visitas', cadPostController.postVisits);

//PUT
router.put('/usuario/:codigo', cadPutController.putUser);
router.put('/cliente/:codigo', cadPutController.putClient);
router.put('/visita/:codigo', cadPutController.putVisit);

//DELETE
router.delete('/usuario/:codigo', cadDeleteController.deleteUser);
router.delete('/cliente/:codigo', cadDeleteController.deleteClient);
router.delete('/visita/:codigo', cadDeleteController.deleteVisit);


module.exports = router;