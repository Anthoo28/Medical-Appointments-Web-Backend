// Description: Routes for user
const { Router } = require("express");
const { check } = require("express-validator");

//mideleware
const { validated } = require("../middlewares/validated");

//methods
const {
  getUsers,
  getUserByDni,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

//helpers
const {
  validateDNI,
  validateNotEmpty,
  validatePhone,
  validateEmail,
  validateBornDate,
  validateGender,
  existUserDni,
  dontExistUserDni,
} = require("../helpers/user-helpers/user-db-validators");

const { requiredFields } = require("../helpers/required/required-fields");
const { hasRole } = require("../middlewares/validated-roles");
const { validateDNIU, validatePhoneU, validateBornDateU, validateGenderU } = require("../helpers/user-helpers/update");

//instanciar el router
const router = Router();

//obtener todos los usuarios
router.get("/", getUsers);

//obtener un usuario por su dni y validarlo
router.get(
  "/:dni",
  [validateDNI(), dontExistUserDni(), validated],
  getUserByDni
);

//crear un usuario y validarlo
router.post(
  "/",
  [
    validateDNI(),
    check("dni", "The dni already exist").custom(existUserDni),
    validateNotEmpty(requiredFields),
    validateEmail(),
    validatePhone(),
    validateBornDate(),
    validateGender(),

    check("password", "The password must have at least 6 characters").isLength({
      min: 6,
    }),
    validated,
  ],
  createUser
);

//actualizar un usuario y validarlo
router.put(
  "/:dni",
  [
    validateDNIU(),
    validatePhoneU(),
    validateBornDateU(),
    validateGenderU(),
    check("password", "The password must have at least 6 characters").isLength({
      min: 6,
    }).optional(),
    
  ],
  validated,
  updateUser,
);

//eliminar un usuario y validarlo
router.delete(
  "/:dni",
  [
    //hasRole("ADMIN_ROLE"),
    validateDNI(),
    dontExistUserDni(),
    validated,
  ],
  deleteUser
);

module.exports = router;
