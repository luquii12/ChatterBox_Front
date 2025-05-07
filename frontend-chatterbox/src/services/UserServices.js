
import instance from './http';


const API_URL = "/auth"

class UserServices {

    static logIn(data) {
        return instance.post(`${API_URL}/login`, data)

    }
}

export default UserServices;