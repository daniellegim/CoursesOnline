import axios from 'axios'

export default class CourseServer {

    static getAllCourses(page, categories, price, rating) {
        return axios.get("/courses", {
            params: {
                page: page,
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
    static deleteCourse(newCourse) {
        console.log(newCourse)
        return axios.get("/courses/delete",{
            params:{
                id:newCourse._id
            }
        })
            .then(response => response)
            .catch(err => err.message)
    }
    static updateCourse(newCourse) {
        console.log(newCourse)
        return axios.get("/courses/update",{
            params:{
                id:newCourse._id,
                name: newCourse.name,
                description: newCourse.description,
                price: newCourse.price,
                author:newCourse.author,
                rating:newCourse.rating
            }
        })
            .then(response => response)
            .catch(err => err.message)
    }
}