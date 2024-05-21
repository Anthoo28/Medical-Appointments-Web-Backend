const SpecialtyService = require('../services/specialtyService');

const specialtyService = new SpecialtyService();


const getSpecialties = async (req,res) => {
    try {
        const specialties= await specialtyService.getAllSpecialties();
        res.status(200).json(specialties);
        
    } catch (error) {
        res.status(500).json({error:"Error getting specialties"});
    }
}

const getSpecialtyById=async (req, res)=>{
    try {
        const specialty = await specialtyService.getSpecialtyId(req.params.id);
        res.status(200).json(specialty);
    } catch (error) {
        res.status(500).json({error:"Error getting specialty by id"});
    }
}

const createSpecialty=async (req, res)=>{
    try {
        await specialtyService.createSpecialty(req.body);
        console.log(req.body)
        res.status(200).json("Specialty created successfully");     
    } catch (error) {
        res.status(500).json({error:"Error creating specialty"});
    }
}

const updateSpecialty=async (req, res)=>{
    try {
        const specialty = await specialtyService.updateSpecialty(req.params.id, req.body);
        res.status(200).json("Specialty updated successfully");
    } catch (error) {
        res.status(500).json({error:"Error updating specialty"});
    }
}

const deleteSpecialty=async (req,res)=>{
    try {
        const specialty = await specialtyService.deleteSpecialty(req.params.id);
        res.status(200).json("Specialty deleted successfully");
    } catch (error) {
        res.status(500).json({error:"Error deleting specialty"})
    }
}





module.exports={
    getSpecialties,
    getSpecialtyById,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty

}