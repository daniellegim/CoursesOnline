import axios from 'axios'

export default class UserCourseServer {

    static getAllCourses(userId) {
        // const userId = "111"
        return axios.get("/usercourses/" + userId)
                .then(response => response.data)
                .catch(err => err.message)
    }

    static getCategoryChartData() {
        return axios.get("/usercourses")
                .then(response => response.data)
                .catch(err => err.message)
    }

    static addUserCourses(courses) {
        return axios.post("/usercourses", { courses })
                .then(response => response)
                .catch(err => err.message)
    }
}