import { Grid } from "@mui/material"
import Course from "./Course"

const CoursesList = (props) => {
    const courses = props.courses

    return (
        <Grid container spacing={2} sx={{ overflow: "auto", maxHeight: "73vh" }}>
            {courses.map(course =>
                <Grid key={course._id} item xs={4}>
                    <Course course={course} userCourses={props.userCourses} />
                </Grid>
            )
            }
        </Grid>
    )
}

export default CoursesList