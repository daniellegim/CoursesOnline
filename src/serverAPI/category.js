import axios from 'axios'

export default class CategoryServer {

    static getAllCategories() {
        return axios.get("/categories")
                .then(response => response.data)
                .catch(err => err.message)
    }

    static addCategory(newCategories) {
        return axios.post("/categories", { newCategories })
            .then(response => response)
            .catch(err => err.message)
    }

    static updateCategory(category) {
        return axios.patch("/categories", { category })
            .then(response => response)
            .catch(err => err.message)
    }
}