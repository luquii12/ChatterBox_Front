import instance from './http';




const API_URL = "/usuarios"

class GroupServices {

    static getAllGroups(id) {
        return instance.get(`${API_URL}/${id}/grupos`)

    }
    static getChatsFromGroup(id) {
        return instance.get(`/grupos/${id}/chats`)
    }
    static createGroup(data) {
        return instance.post("/grupos", data)
    }
    static joinGroup( id_grupo) {
        return instance.post(`/grupos/${id_grupo}/join`)
    }
    static getpublic() {
        return instance.get("/grupos")
    }
    static createChat(data) {
    return instance.post("/chats", data);
  }
 
}

export default GroupServices;