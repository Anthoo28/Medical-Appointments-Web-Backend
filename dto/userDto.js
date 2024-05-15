// userDto.js
class UserDto {
    constructor(user) {
        this.dni = user.dni;
        this.name = user.name;
        this.lastname = user.lastname;
        this.bornDate = user.bornDate;
        this.phone = user.phone;
        this.email = user.email;
        this.address = user.address;
        this.gender = user.gender;
        this.img = user.img;
        this.role = user.role;
        this.status = user.status;
        this.google = user.google;
    }
}

module.exports = UserDto;
