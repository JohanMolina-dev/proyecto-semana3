const router = require('express').Router();
const userController = require ('../../controllers/UserController.js');




router.post('/signin', userController.signin);




module.exports = router;






