import { useContext, useEffect, useState } from "react"
import CoursesList from "../Course/CoursesList"
import UserCourseServer from "../../serverAPI/userCourses"
import { Grid, Typography } from "@mui/material"
import AuthContext from "../../store/auth-context"

const UserCourses = () => {
    const [courses, setCourses] = useState([])
    const authCtx = useContext(AuthContext)

    useEffect(() => {
        const getData = async () => {
            const data = await UserCourseServer.getAllCourses(authCtx.userId)
            const courses = data.map(course => course.courseId)

            setCourses(courses)
        }

        getData()
    }, [])

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "1em" }}>
            <Grid item xs={3}>
                <Typography variant="h4">קורסים שרכשתי</Typography>
            </Grid>
            <Grid item xs={10}>
                <CoursesList courses={courses} userCourses={true} />
            </Grid>
        </Grid>
    )
}

export default UserCourses