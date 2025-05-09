import instance from './http';




const API_URL = "/usuarios"

class GroupServices {

    static getAllGroups(id) {
        return instance.get(`${API_URL}/${id}/grupos`)

    }
 
}

export default GroupServices;