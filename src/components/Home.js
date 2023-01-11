import { Grid } from "@mui/material"
import Course from "./Course/Course"

const Home = () => {
    const courses = [
        {
            id: 1,
            name: "react",
            description: "react course",
            price: "200"
        },
        {
            id: 2,
            name: "C++",
            description: "C++ course",
            price: "150"
        },
        {
            id: 3,
            name: "Python",
            description: "python course",
            price: "100"
        }
    ]

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "2em" }}>
            {courses.map(course =>
                <Grid item xs={8}>
                    <Course course={course} />
                </Grid>
            )
            }
        </Grid>
    )
}

export default Home