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
            // Buscar la especialidad por su ID
            const specialty = await Specialty.findByIdAndUpdate(id, specialtyData, { new: true, status: true });
            if (!specialty) {
                throw new Error('Specialty not found');
            }
    
            // Actualizar los campos de la especialidad con los datos proporcionados
            if (specialtyData.name) {
                specialty.name = specialtyData.name.toUpperCase();
            }
            
            // Guardar los cambios en la base de datos
            await specialty.save();
    
            // Devolver la especialidad actualizada como un DTO
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