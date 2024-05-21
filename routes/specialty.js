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


//instanciar el router

const router = Router();

//ver todas las especialidades
router.get('/', getSpecialties);

router.get('/:id',[
    check("id", "no es un id valido").isMongoId(),
    check("id").custom(existSpecialtyid),
    validated
] ,getSpecialtyById);

router.post('/',[
] , createSpecialty);

router.put('/:id',[
    check("id", "no es un id valido").isMongoId(),
    check("id").custom(existSpecialtyid),
    validated
] ,updateSpecialty);

router.delete('/:id',[
    check("id", "no es un id valido").isMongoId(),
    check("id").custom(existSpecialtyid),
    validated
] ,deleteSpecialty);










module.exports = router;
