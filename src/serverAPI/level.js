import axios from 'axios'

export default class LevelServer {

    static getAllLevels() {
        return axios.get("/levels")
                .then(response => response.data)
                .catch(err => err.message)
    }

    static addLevel(newLevels) {
        return axios.post("/levels", { newLevels })
            .then(response => response)
            .catch(err => err.message)
    }

    static updateLevel(level) {
        return axios.patch("/levels", { level })
            .then(response => response)
            .catch(err => err.message)
    }
}