import { useEffect, useState } from "react"
import { Autocomplete, TextField } from "@mui/material"
import { useDebounce } from "../../hooks/usedebounce"

const Search = (props) => {
    const [searchInput, setsearchInput] = useState("")
    const debouncedSearchTerm = useDebounce(searchInput, 400)
    const courses = props.courses

    useEffect(() => {
        // send request only when the user stops typing for 400 ms
        if (debouncedSearchTerm) {
            props.filterCourses(debouncedSearchTerm)
        } else {
            props.filterCourses([])
        }
    }, [debouncedSearchTerm])

    const handleSearchChange = (event) => {
        setsearchInput(event.target.value)
    }

    return (
        <Autocomplete
            freeSolo
            disableClearable
            open={false}
            options={courses.map((option) => option.name)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="חפש קורס"
                    value={searchInput}
                    onChange={handleSearchChange}
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                    }}
                />
            )}
        />
    )
}

export default Search