const { Router } = require('express');
const { login, googleSignIn,  } = require('../controllers/auth');
const { validated } = require('../middlewares/validated');
const { check } = require('express-validator');
const { validateDNI } = require('../helpers/user-helpers/user-db-validators');


const router = Router();

router.post('/login',[validateDNI(),
check('password',"passsword obligatorio").not().isEmpty(),
validated], login);




router.post('/google',[ check('id_token',"it_token es necesario").not().isEmpty(),
validated],googleSignIn);




module.exports = router;