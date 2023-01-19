import { Slider, Typography } from "@mui/material"

const SliderFilter = (props) => {
    const list = props.list
    const maxValue = Math.min(list.max, props.max)

    const marks = [
        {
            value: list.min,
            label: `${list.min}₪`,
        },
        {
            value: maxValue,
            label: `${maxValue}₪`,
        }
    ]

    return (
        <>
            <Typography>{props.label}</Typography>
            <Slider
                valueLabelDisplay="auto"
                max={props.max}
                value={[list.min, list.max]}
                marks={marks}
                onChange={props.handleSliderChange}
                sx={{ marginTop: "1em" }}
            />
        </>
    )
}

export default SliderFilter