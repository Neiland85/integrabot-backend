const express = require('express');
const router = express.Router();
const { procesarMensaje } = require('../controllers/chatController');

router.post('/', procesarMensaje);

module.exports = router;

