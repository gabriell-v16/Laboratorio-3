import { Contacto } from "../../models/Contacto.js";
import mongoose from "mongoose";

export class ContactoClass{
    static async añadirContacto(data){
        const nuevoContact = new Contacto(data);
        await nuevoContact.save();
        return nuevoContact;
    }
    static async obtenerContactos(id){
        const objectId = new mongoose.Types.ObjectId(id); // CONVERTIR ID A ObjectId
        const contactos = await Contacto.find({ propietario: objectId }); 
        return contactos;
    }
    static async obtenerTodosContactos(){
        return await Contacto.find();
    }
    static async encontrarContacto(id){
        return await Contacto.findById(id);
    }
    static async editarContacto(id,data){
        return await Contacto.findByIdAndUpdate(id,data, {new:true});
    }
    static async eliminarContacto(id){
        return await Contacto.findByIdAndDelete(id);
    }
    static async ocultarContacto(id){
        return Contacto.findByIdAndUpdate(id, {esVisible: false}, {new:true})
    }
    static async contactosPublicos(){
        return Contacto.find({esPublico: true});
    }
}