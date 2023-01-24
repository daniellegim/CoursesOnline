import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from "@mui/material"

const CheckboxList = (props) => {
    
    return (
        <FormControl>
            <FormLabel>{props.label}</FormLabel>
            <FormGroup>
                {
                    Object.entries(props.list).map(([key, value]) => {
                        return (
                            <FormControlLabel
                                control={
                                    <Checkbox name={key} checked={value} onChange={e => props.handleCheckChange(e, props.listName)} />
                                }
                                label={key}
                            />
                        )
                    })
                }
            </FormGroup>
        </FormControl>
    )
}

export default CheckboxList