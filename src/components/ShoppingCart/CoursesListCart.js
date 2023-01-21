import { Grid } from "@mui/material"
import CourseInCart from "./CourseInCart"

const CoursesListCart = (props) => {
    const courses = props.courses

    return (
        <Grid container spacing={2}>
            {courses.map(course =>
                <Grid item xs={12}>
                    <CourseInCart course={course} />
                </Grid>
            )
            }
        </Grid>
    )
}

export default CoursesListCart