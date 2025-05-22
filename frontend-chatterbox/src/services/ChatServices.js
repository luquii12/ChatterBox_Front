import instance from './http';




const API_URL = "/chats"

class ChatServices {

    static getAllMesajesFromChat(id) {
        return instance.get(`${API_URL}/${id}/mensajes`)

    }
    
 
}

export default ChatServices;