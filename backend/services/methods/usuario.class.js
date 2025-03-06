import { Usuario } from "../../models/Usuario.js";


export class UsuarioClass{
    static async añadirUsuario(data){
        const nuevoUsuario = new Usuario(data);
        await nuevoUsuario.save();
        return nuevoUsuario;
    }
    static async obtenerUsuarios(){
        return await Usuario.find();
    }
    static async encontrarUsuario(data){
        return await Usuario.findOne({email:data})
    }
    static async editarUsuario(id,data){
        return await Usuario.findByIdAndUpdate(id,data, {new:true});
    }
    static async eliminarUsuario(id){
        return await Usuario.findByIdAndDelete(id)
    }
    static async obtenerUsuarioPerfil(id){
        return await Usuario.findById(id);
    }
}