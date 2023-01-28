import axios from 'axios'

export default class CourseServer {

    static getAllCourses() {
        return axios.get("/courses")
            .then(response => response.data)
            .catch(err => err.message)
    }

    static getFilteredCourses(categories, price, rating) {
        return axios.get("/courses/filtered", {
            params: {
                categories: categories,
                price: price,
                rating: rating
            }
        })
            .then(response => response.data)
            .catch(err => err.message)
    }

    static addCourse(newCourse) {
        return axios.post("/courses", { newCourse })
            .then(response => response)
            .catch(err => err.message)
    }
}