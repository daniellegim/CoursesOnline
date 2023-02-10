import {Typography, Grid,CircularProgress,Backdrop } from "@mui/material"
import { useEffect, useState } from "react"
import CourseServer from "../serverAPI/course"
import CoursesList from "./Course/CoursesList"
import Filter from "./Filter/Filter"
import Search from "./SearchBar/Search"
import ShoppingCart from "./ShoppingCart/ShoppingCart"

const Home = () => {
    const [courses, setCourses] = useState([])
    const [filteredCourses, setFilteresCourses] = useState([])
    const [filters, setFilters] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const getData = async () => {
            const categories = filters["category"]?.value.map(category => category._id)

            const data = await CourseServer.getAllCourses(page, categories, filters["price"], filters["rating"]?.value)
            const filtered = page === 1 ? data : [...filteredCourses, ...data]

            setCourses([...courses, ...data])
            setLoading(false);
            setFilteresCourses(filtered)
        }

        getData()
    }, [page, filters])

    const handleLoadMore = () => {
        setLoading(true)
        setPage(prev => prev + 1)
        setLoading(false)
    }

    const filterCoursesByName = (value) => {
        setLoading(true)
        const filtered = courses.filter(course => course.name.toLowerCase().includes(value.toLowerCase()))
        setFilteresCourses(filtered)
        setLoading(false)
    }

    const filterCourses = async (filter) => {
        setLoading(true)
        setFilters(filter)
        setPage(1)
        setLoading(false);
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
            {(isLoading)? 
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open >
                <CircularProgress color="inherit" size="10rem" /> 
            </Backdrop>
            :
                <CoursesList courses={filteredCourses} handleLoadMore={handleLoadMore} />
            }
            </Grid>
        </Grid>
    )
}

export default Home