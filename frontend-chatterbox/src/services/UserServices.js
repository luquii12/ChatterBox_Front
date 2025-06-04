
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
    static getAllUsers(params) {
        return instance.get('/usuarios', { params });
    }
    static deleteUser(id){
        return instance.delete(`/usuarios/${id}`)
    }
    static removeUserAdmin(id){
        return instance.delete(`usuarios/${id}/roles/admin_general`)
    }
    static makeUserAdmin(id){
        return instance.put(`usuarios/${id}/roles/admin_general`)
    }
}

export default UserServices;