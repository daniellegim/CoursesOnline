import { Button, Grid } from "@mui/material"
import Course from "./Course"
import { useNavigate } from 'react-router-dom';

const CoursesList = (props) => {
    const courses = props.courses
    const history = useNavigate();

    const navigateProduct = (course) => {
        history('/course/', { state: { course: course } });
    }

    return (
        <Grid container spacing={2} sx={{ overflow: "auto", maxHeight: "73vh" }}>
            {courses.map(course =>
                <Grid key={course._id} item xs={4} sx={{ marginTop: "0.5em" }}>
                    <Course course={course} userCourses={props.userCourses} navigateProduct={navigateProduct} />
                </Grid>
            )
            }
            <Grid item container justifyContent="center">
                {!props.userCourses && courses.length >= 50 ?
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={props.handleLoadMore}
                            sx={{ marginBottom: "0.5em", width: "12em" }}>
                            טען עוד
                        </Button>
                    </Grid>
                    : null
                }
            </Grid>
        </Grid>
    )
}

export default CoursesList