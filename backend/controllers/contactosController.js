import {ContactoClass} from '../services/methods/contactos.class.js'

export const getContactos = async (req, res) => {
    try{
          const idUser = req.usuario.id
          console.log(idUser);
          const contactos = await ContactoClass.obtenerContactos(idUser);
          console.log('contactos: ' + contactos);
          res.json(contactos);
    } catch(error){
      console.log(error);
        res.status(500).json({mensaje: "Error en el servidor", error});
    }
}

export const crearContacto = async (req, res) => {
    try{
        const nuevoContacto = {
            ...req.body,
            propietario: req.usuario.id,
          };
          console.log(nuevoContacto)
        const contacto = await ContactoClass.añadirContacto(nuevoContacto)
          res.status(201).json(contacto);
    } catch(error){
      console.log(error);
        res.status(500).json({mensaje: "Error en el servidor", error});
    }
}

export const actualizarContacto = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const contacto = await ContactoClass.encontrarContacto(id)
        if (!contacto) return res.status(404).json({ mensaje: "Contacto no encontrado" });
    
        if (contacto.propietario.toString() !== req.usuario.id && !req.usuario.esAdmin) {
          return res.status(403).json({ mensaje: "No tienes permiso para actualizar este contacto" });
        }
        console.log(data);
        const contactoActualizado = await ContactoClass.editarContacto(id, data);
        res.json(contactoActualizado);
      } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error });
      }
}

export const eliminarContacto = async (req, res) => {
    try {
        const id = req.params.id;
        const contacto = await ContactoClass.encontrarContacto(id);
        if (!contacto) return res.status(404).json({ mensaje: "Contacto no encontrado" });
    
        if (contacto.propietario.toString() !== req.usuario.id && !req.usuario.esAdmin) {
          return res.status(403).json({ mensaje: "No tienes permiso para eliminar este contacto" });
        }
    
        await ContactoClass.eliminarContacto(id);
        res.json({ mensaje: "Contacto eliminado exitosamente" });
      } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error });
      }
}

export const ocultarContacto = async (req,res)=>{
  try {
    const id = req.params.id;
    const contacto = await ContactoClass.ocultarContacto(id);
    res.status(200).json({message:'Contacto ocultado con éxito', success:true});
  } catch (error) {
    res.status(500).json({message: 'Error interno del servidor: ' + error});
  }
}
export const contactosPublicos = async(req,res)=>{
  try {
    const contactos = await ContactoClass.contactosPublicos();
    res.status(200).json(contactos);
  } catch (error) {
    res.status(500).json({message:'Error interno del servidor: ' + error});
  }
}

export const getContactosAdmin = async(req,res)=>{
  try {
    if(req.usuario.esAdmin ===true){
      const contactos = await ContactoClass.obtenerTodosContactos();
      res.status(200).json(contactos);
    }else{
      res.status(401).json({message:'No autorizado'});
    }
  } catch (error) {
    res.status(500).json({message:'Error interno del servidor: ', error});
  }
}

export const mostrarContactos = async(req,res)=>{
  try {
    const id = req.params.id;
    const contacto = await ContactoClass.editarContacto(id, {esVisible:true});
    res.status(200).json({message:'Contacto visible', success:true});
  } catch (error) {
    res.status(500).json({message:'Error interno del servidor: ', error});
  }
}