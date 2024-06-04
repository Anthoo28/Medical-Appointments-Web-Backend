const { Router } = require('express');
const {  googleSignIn, loginUser, loginDoctor,  } = require('../controllers/auth');
const { validated } = require('../middlewares/validated');
const { check } = require('express-validator');
const { validateDNI } = require('../helpers/user-helpers/user-db-validators');


const router = Router();




router.post('/loginUser',[validateDNI(),
check('password',"passsword obligatorio").not().isEmpty(),
validated], loginUser);

router.post('/loginDoctor',[validateDNI(),
    check('password',"passsword obligatorio").not().isEmpty(),
    validated], loginDoctor);
    


router.post('/google',[ check('id_token',"it_token es necesario").not().isEmpty(),
validated],googleSignIn);




module.exports = router;