import { Autocomplete, TextField } from "@mui/material"

const Search = (props) => {
    const courses = props.courses

    return (
        <Autocomplete
            freeSolo
            disableClearable
            open={false}
            options={courses.map((option) => option.name)}
            onInputChange={(e, value) => props.filterCourses(value)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="חפש קורס"
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