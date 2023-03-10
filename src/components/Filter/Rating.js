import { Rating, Typography } from "@mui/material"

const RatingFilter = (props) => {
    return (
        <>
            <Typography>{props.label}</Typography>
            <Rating value={props.filter?.value || 0} precision={0.5} onChange={props.handleValueChange(props.filterName)}
            />
        </>
    )
}

export default RatingFilter