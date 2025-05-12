import instance from './http';




const API_URL = "/usuarios"

class GroupServices {

    static getAllGroups(id) {
        return instance.get(`${API_URL}/${id}/grupos`)
    }
    static getChatsFromGroup(id) {
        return instance.get(`/grupos/${id}/chats`)
    }
 
}

export default GroupServices;