
import instance from './http';


const API_URL = "/auth"

class UserServices {

    static logIn(data) {
        return instance.post(`${API_URL}/login`, data)

    }
    static signUp(data) {
        return instance.post(`${API_URL}/register`, data)
    }


     static creteGroup(data) {
        return instance.post(`${API_URL}/register`, data)
    }
}

export default UserServices;