
import instance from './http';


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
}

export default UserServices;