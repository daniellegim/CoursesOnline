import {Typography, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import CourseServer from "../serverAPI/course"
import CoursesList from "./Course/CoursesList"
import Filter from "./Filter/Filter"
import Search from "./SearchBar/Search"
import ShoppingCart from "./ShoppingCart/ShoppingCart"

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

    const filterCoursesByName = (value) => {
        const filtered = courses.filter(course => course.name.toLowerCase().includes(value.toLowerCase()))
        setFilteresCourses(filtered)
    }

    const filterCourses = async (filters) => {
        const categories = filters["category"]?.value.map(category => category._id)

        const filtered = await CourseServer.getFilteredCourses(categories, filters["price"], filters["rating"]?.value)

        setFilteresCourses(filtered)
    }

    return (

        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "1em" }}>

            <Grid item xs={3} />
            <Grid item xs={5}>
            <Typography variant="h6" component="div">קורסים אונליין</Typography>
                <Search courses={courses} filterCourses={filterCoursesByName} />
            </Grid>
            <Grid item xs={2}>
                <Filter courses={courses} filterCourses={filterCourses} />
            </Grid>
            <Grid item xs={1}>
                <ShoppingCart />
            </Grid>
            <Grid item xs={10}>

                <CoursesList courses={filteredCourses} />
            </Grid>
        </Grid>
    )
}

export default Home