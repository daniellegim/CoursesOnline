import { Grid } from "@mui/material"
import Course from "./Course"

const CoursesList = (props) => {
    const courses = props.courses

    return (
        <Grid container justifyContent="center" spacing={2}>
            {courses.map(course =>
                <Grid item xs={8}>
                    <Course course={course} />
                </Grid>
            )
            }
        </Grid>
    )
}

export default CoursesList