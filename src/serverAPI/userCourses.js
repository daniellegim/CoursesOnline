import axios from 'axios'

export default class UserCourseServer {

    // static getAllCourses() {
    //     return axios.get("/courses")
    //             .then(response => response.data)
    //             .catch(err => err.message)
    // }

    static addUserCourses(courses) {
        return axios.post("/usercourses", { courses })
                .then(response => response)
                .catch(err => err.message)
    }
}