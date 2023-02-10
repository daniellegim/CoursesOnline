import { Grid } from "@mui/material"
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
    const [page, setPage] = useState(1)

    useEffect(() => {
        const getData = async () => {
            const categories = filters["category"]?.value.map(category => category._id)

            const data = await CourseServer.getAllCourses(null, page, categories, filters["price"], filters["rating"]?.value)
            const filtered = page === 1 ? data : [...filteredCourses, ...data]

            setCourses([...courses, ...data])
            setFilteresCourses(filtered)
        }

        getData()
    }, [page, filters])

    const handleLoadMore = () => {
        setPage(prev => prev + 1)
    }

    const filterCoursesByName = async (value) => {
        const filtered = await CourseServer.getAllCourses(value)
        setFilteresCourses(filtered)
    }

    const filterCourses = async (filter) => {
        setFilters(filter)
        setPage(1)
    }

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "1em" }}>
            <Grid item xs={3} />
            <Grid item xs={5}>
                <Search courses={courses} filterCourses={filterCoursesByName} />
            </Grid>
            <Grid item xs={2}>
                <Filter courses={courses} filterCourses={filterCourses} />
            </Grid>
            <Grid item xs={1}>
                <ShoppingCart />
            </Grid>
            <Grid item xs={10}>
                <CoursesList courses={filteredCourses} handleLoadMore={handleLoadMore} />
            </Grid>
        </Grid>
    )
}

export default Home