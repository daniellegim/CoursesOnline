import { Grid } from "@mui/material"
import { useState } from "react"
import CoursesList from "./Course/CoursesList"
import Filter from "./SearchBar/Filter"
import Search from "./SearchBar/Search"

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

    const [filteredCourses, setFilteresCourses] = useState(courses)

    const filterCourses = (value) => {
        const filtered = courses.filter(course => course.name.toLowerCase().includes(value.toLowerCase()))
        setFilteresCourses(filtered)
    }

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "1em" }}>
            <Grid item xs={2} />
            <Grid item xs={6}>
                <Search courses={courses} filterCourses={filterCourses} />
            </Grid>
            <Grid item xs={2}>
                <Filter />
            </Grid>
            <Grid item xs={12}>
                <CoursesList courses={filteredCourses} />
            </Grid>
        </Grid>
    )
}

export default Home