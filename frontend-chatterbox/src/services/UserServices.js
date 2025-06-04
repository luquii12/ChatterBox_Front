
import instance, { multipartInstance } from './http';


const API_URL = "/auth"

class UserServices {

    static logIn(data) {
        return instance.post(`${API_URL}/login`, data)

    }
    static signUp(data) {
        return instance.post(`${API_URL}/register`, data)
    }
    static getUserById(id) {
        return instance.get(`/usuarios/${id}`)
    }
    static getUserPicture(id) {
        return instance.get(`/usuarios/${id}/foto-perfil`,{
            responseType: 'blob' // Para manejar imágenes
        });
    }
    static updateUser(id, data) {
        return multipartInstance.put(`/usuarios/${id}`, data)
    }
    static getUserImage(id) {
        return instance.get(`/usuarios/${id}/foto-perfil`, {
            responseType: 'blob' // Para manejar imágenes
        });
    }
}

export default UserServices;