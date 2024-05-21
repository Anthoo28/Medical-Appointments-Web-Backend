class SpecialtyDto{
    
    constructor(specialty){
        this.id=specialty.id;
        this.name=specialty.name;
        this.description=specialty.description;
        this.status=specialty.status;
        this.img=specialty.img;
    }


}


module.exports=SpecialtyDto;