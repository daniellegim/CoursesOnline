import { Slider, Typography } from "@mui/material"

const price = {
    min: 0,
    max: 400
}

const SliderFilter = (props) => {
    const list = props.list
    const markMin = list?.min || price.min
    const markMax = list?.max || price.max
    const maxValue = Math.min(markMax, props.max)

    const marks = [
        {
            value: markMin,
            label: `${markMin}₪`,
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
                value={[markMin, markMax]}
                marks={marks}
                onChange={props.handleSliderChange}
                sx={{ marginTop: "1em" }}
            />
        </>
    )
}

export default SliderFilter