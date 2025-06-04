import instance from './http';

import { multipartInstance } from './http';


const API_URL = "/usuarios"

class GroupServices {

    static getAllGroups(id) {
        return instance.get(`${API_URL}/${id}/grupos`)

    }
    static getChatsFromGroup(id) {
        return instance.get(`/grupos/${id}/chats`)
    }
    static createGroup(data) {
        return multipartInstance.post("/grupos", data)
    }
    static joinGroup(id_grupo) {
        return instance.post(`/grupos/${id_grupo}/join`)
    }
    static getpublic(nombre) {
        return instance.get(`/grupos/publicos/disponibles?nombre=${nombre}`)
    }
    static getImagenGrupo(id) {
        return instance.get(`/grupos/${id}/foto`, {
            responseType: 'blob' // Para manejar imágenes
        });
    }
    static createChat(data) {
        return instance.post("/chats", data)
    }
    static leaveGroup(id_grupo) {
        return instance.delete(`/grupos/${id_grupo}/leave`)
    }
    static getGroupById(id) {
        return instance.get(`/grupos/${id}`)
    }
    static deleteChat(id_chat) {
        return instance.delete(`/chats/${id_chat}`)
    }
    static updateGroup(id, data) {
        return multipartInstance.put(`/grupos/${id}`, data);
    }
    static getGroupUsers(id) {
        return instance.get(`/grupos/${id}/usuarios`);
    }
    static removeUserFromGroup(id_grupo, id_usuario) {
        return instance.delete(`/grupos/${id_grupo}/usuarios/${id_usuario}`);
    }
    static searchUsers(id_grupo, apodo) {
        return instance.get(`/grupos/${id_grupo}/usuarios/disponibles`, {
            params: { apodo }
        });

    }
    static addUserToGroup(id_grupo, id_usuario) {
        return instance.post(`/grupos/${id_grupo}/usuarios/${id_usuario}/add`);
    }
    static setUserAdmin(id_grupo, id_usuario, es_admin) {
        return instance.put(`/grupos/${id_grupo}/usuarios/${id_usuario}/roles/admin_grupo`, { es_admin });
    }
    static deleteUserAdmin(id_grupo, id_usuario) {
        return instance.delete(`/grupos/${id_grupo}/usuarios/${id_usuario}/roles/admin_grupo`);
    }
}

export default GroupServices;