import { Autocomplete, TextField } from "@mui/material"

const AutocompleteFilter = (props) => {
    return (
        <Autocomplete
            multiple
            value={props.filter.value}
            options={props.options}
            getOptionLabel={(option) => option.name}
            onChange={props.handleValueChange(props.filterName)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label={props.label}
                />
            )}
        />
    )
}

export default AutocompleteFilter