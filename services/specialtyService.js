const SpecialtyDto = require('../dto/specialtyDto');
const Specialty = require('../models/specialty');

class SpecialtyService{
    constructor(){

    }

    //metodo para obtener todas las especialidades
    async getAllSpecialties(){
        try {
            const specialties = await Specialty.find({status:true});
            
            return specialties.map(specialty=>new SpecialtyDto(specialty));
            
        } catch (error) {
            throw new Error('Error getting specialties');
        }
    }
    

    //metodo para obtener una especialidad por su id
    async getSpecialtyId(id){
        try {
            const specialty= await Specialty.findById({_id:id, status:true});
            if(!specialty){
                throw new Error('Specialty not found');
            };
            return new SpecialtyDto(specialty);
        } catch (error) {
            throw new Error('Error getting specialty by id');
        }
    }


    //metodo para crear una especialidad
    async createSpecialty(specialtyData){
        try {
            const{name}=specialtyData;
            const specialty = new Specialty(specialtyData);
            //
            specialty.name=name.toUpperCase();
            await specialty.save();
            return new SpecialtyDto(specialty);
        } catch (error) {
            throw new Error('Error creating specialty');
        }
    }

    async updateSpecialty(id, specialtyData) {
        try {
            const specialty = await Specialty.findById({ _id: id, status: true });
            if (!specialty) {
                throw new Error('Specialty not found');
            }

            // Actualizar solo los campos presentes en specialtyData
            for (const [key, value] of Object.entries(specialtyData)) {
                // Verificar si el campo existe en specialty
                 if (specialty[key] !== undefined) {
                    if(key==='name'){
                        specialty[key]=value.toUpperCase();
                    }else{
                    specialty[key] = value;
                }
                }
            }
            await specialty.save();
            return new SpecialtyDto(specialty);
            
        } catch (error) {
            throw new Error('Error updating specialty');
        }
    }


    async deleteSpecialty(id){
        try {
            const specialty= await Specialty.findById({_id:id, status:true});
            if(!specialty){
                throw new Error('Specialty not found');
            }
            specialty.status=false;
            await specialty.save();
            return new SpecialtyDto(specialty);
            
        } catch (error) {
            throw new Error('Error deleting specialty');
        }
    }
    






    
    
}

module.exports = SpecialtyService;