import API from "../api";


export const verify = async ()=>{
    try {
        const response = await API.get('/verify');
        console.log(response);
        return response.data;
    } catch (error) {
        console.log('Error en la verificación: ' + error);
    }
}