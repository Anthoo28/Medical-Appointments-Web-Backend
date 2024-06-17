const {Router}= require('express');
const {check}= require('express-validator');    

//methods
const{
    getSpecialties,
    getSpecialtyById,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty
}= require('../controllers/specialtyController');
const { existSpecialtyid } = require('../helpers/specialty-helpers/specialty-db-validator');
const { validated } = require('../middlewares/validated');
const { validateJWT } = require('../middlewares/validated-jwt/validated-jwt');
const { hasRole, isAdminRole } = require('../middlewares/validated-roles/validated-roles');


//instanciar el router

const router = Router();

//ver todas las especialidades
router.get('/',validateJWT, getSpecialties);

router.get('/:id',[
    validateJWT,
    hasRole('ADMIN_ROLE','DOCTOR_ROLE','USER_ROLE'),
    check("id", "no es un id valido").isMongoId(),
    check("id").custom(existSpecialtyid),
    validated
] ,getSpecialtyById);

router.post('/',[
    validateJWT,
    isAdminRole,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validated
] , createSpecialty);

router.put('/:id',[
    validateJWT,
    isAdminRole,
    check("id", "no es un id valido").isMongoId(),
    check("id").custom(existSpecialtyid),
    validated
] ,updateSpecialty);

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check("id", "no es un id valido").isMongoId(),
    check("id").custom(existSpecialtyid),
    validated
] ,deleteSpecialty);










module.exports = router;
