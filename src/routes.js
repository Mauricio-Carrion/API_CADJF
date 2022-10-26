const express = require('express');
const router = express.Router();
const { checkToken } = require('./middlewares/authMiddleware');

const cadGetController = require('./controllers/cadGetController');
const cadPostController = require('./controllers/cadPostController');
const cadPutController = require('./controllers/cadPutController');
const cadDeleteController = require('./controllers/cadDeleteController');

//Rota de autenticação

router.post('/auth/login', cadPostController.authUser); //Publico

//GET
router.get('/usuarios', checkToken, cadGetController.getAllUsers);
//router.get('/usuario/:codigo', checkToken, cadGetController.getUser);
router.get('/clientes', checkToken, cadGetController.getAllClients);
router.get('/cliente/:codigo', checkToken, cadGetController.getClient);
router.get('/visitas', checkToken, cadGetController.getAllVisits);
router.get('/visita/:codigo', checkToken, cadGetController.getVisit);
router.get('/visita_cliente/:codigo', checkToken, cadGetController.getVisitsByClient);
router.get('/cliente_usuario/:codigo', checkToken, cadGetController.getClientsByUser);

//POST
router.post('/usuarios', cadPostController.postUser); //Publico
router.post('/clientes', checkToken, cadPostController.postClient);
router.post('/visitas', checkToken, cadPostController.postVisits);

//PUT
router.put('/usuario/:codigo', checkToken, cadPutController.putUser);
router.put('/cliente/:codigo', checkToken, cadPutController.putClient);
router.put('/visita/:codigo', checkToken, cadPutController.putVisit);

//DELETE
router.delete('/usuario/:codigo', checkToken, cadDeleteController.deleteUser);
router.delete('/cliente/:codigo', checkToken, cadDeleteController.deleteClient);
router.delete('/visita/:codigo', checkToken, cadDeleteController.deleteVisit);


module.exports = router;