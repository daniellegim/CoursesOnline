import axios from 'axios'

export default class CategoryServer {

    static getAllCategories() {
        return axios.get("/categories")
                .then(response => response.data)
                .catch(err => err.message)
    }
}