

export const verify = (req,res)=>{
    try{
       res.status(200).json({message:'Token valido'});
    }catch(error){
        res.status(500).json({message:'Error interno del servidor: ' + error})
    }
}