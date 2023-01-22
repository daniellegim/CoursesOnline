import { Grid } from "@mui/material"
import Course from "./Course"

const CoursesList = (props) => {
    const courses = props.courses

    return (
        <Grid container justifyContent="center" spacing={2}>
            {courses.map(course =>
                <Grid key={course._id} item xs={7}>
                    <Course course={course} />
                </Grid>
            )
            }
        </Grid>
    )
}

export default CoursesList