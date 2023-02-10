import axios from 'axios'

export default class AdminServer {

    static getAdmin(userId) {
        return axios.get("/admin/" + userId)
                .then(response => response.data)
                .catch(err => err.message)
    }
}