const { response } = require("express")

const isAdminRole=(req,res=response, next)=>{

    if(!req.user){
        return res.status(500).json({
            msg:'se quiere verificar el rol sin validar el token primero'
        });
    }

    const {role, name}= req.user;

    if(role !== 'ADMIN-ROLE'){
        return res.status(401).json({
            msg: `${name} no es admin- no puede hacer esto`
        })
    }

    next();
}


const hasRole=(...roles )=>{
    return (req,res=response,next)=>{
        if(!req.user){
            return res.status(500).json({
                msg:'se quiere verificar el rol sin validar el token primero'
            });
        }
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }
}

module.exports={
    isAdminRole,
    hasRole
}