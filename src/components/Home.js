import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import CourseServer from "../serverAPI/course"
import CoursesList from "./Course/CoursesList"
import Filter from "./SearchBar/Filter"
import Search from "./SearchBar/Search"

const Home = () => {
    const [courses, setCourses] = useState([])
    const [filteredCourses, setFilteresCourses] = useState([])

    useEffect(() => {
        const getData = async () => {
            const data = await CourseServer.getAllCourses()

            setCourses(data)
            setFilteresCourses(data)
        }

        getData()
    }, [])

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