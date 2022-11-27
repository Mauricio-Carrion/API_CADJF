const express = require('express');
const router = express.Router();
const { checkToken, checkAdmin, checkUserToken } = require('./middlewares/authMiddleware');

const cadGetController = require('./controllers/cadGetController');
const cadPostController = require('./controllers/cadPostController');
const cadPutController = require('./controllers/cadPutController');
const cadDeleteController = require('./controllers/cadDeleteController');

//Rotas Publicas
router.post('/auth/login', cadPostController.authUser); //Publico
router.post('/usuarios', cadPostController.postUser); //Publico

//GET
router.get('/usuarios', checkToken, checkUserToken, cadGetController.getAllUsers);
//router.get('/usuario/:codigo', checkToken, cadGetController.getUser);
router.get('/clientes', checkToken, checkUserToken, cadGetController.getAllClients);
router.get('/cliente/:codigo', checkToken, checkUserToken, cadGetController.getClient);
router.get('/visitas', checkToken, checkUserToken, cadGetController.getAllVisits);
router.get('/visita/:codigo', checkToken, checkUserToken, cadGetController.getVisit);
router.get('/visita_cliente/:codigo', checkToken, checkUserToken, cadGetController.getVisitsByClient);
router.get('/cliente_usuario/:codigo', checkToken, checkUserToken, cadGetController.getClientsByUser);
router.get('/logs', checkToken, checkUserToken, cadGetController.getLogs);

//POST
router.post('/clientes', checkToken, checkUserToken, cadPostController.postClient);
router.post('/visitas', checkToken, checkUserToken, cadPostController.postVisits);

//PUT
router.put('/usuario/:codigo', checkToken, checkUserToken, checkAdmin, cadPutController.putUser);
router.put('/cliente/:codigo', checkToken, checkUserToken, checkAdmin, cadPutController.putClient);
router.put('/visita/:codigo', checkToken, checkUserToken, checkAdmin, cadPutController.putVisit);

//DELETE
router.delete('/usuario/:codigo', checkToken, checkUserToken, checkAdmin, cadDeleteController.deleteUser);
router.delete('/cliente/:codigo', checkToken, checkUserToken, checkAdmin, cadDeleteController.deleteClient);
router.delete('/visita/:codigo', checkToken, checkUserToken, checkAdmin, cadDeleteController.deleteVisit);


module.exports = router;