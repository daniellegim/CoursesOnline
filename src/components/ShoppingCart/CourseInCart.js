import { Card, CardHeader, IconButton, Stack, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import { useCartFunctions } from "./CartContext"

const CourseInCart = (props) => {
    const course = props.course
    const { removeFromCart } = useCartFunctions()

    const handleRemoveFromCart = (course) => {
        removeFromCart(course)
    }

    return (
        <Stack direction="row" spacing={1}>
            <Card key={course._id} sx={{ width: "100%" }}>
                <CardHeader
                    title={course.name}
                    action={
                        <Typography variant="h6" sx={{ marginRight: "1em", marginTop: "0.5em" }}>{course.price}₪</Typography>
                    }
                    subheader={course.description}
                />
            </Card>
            <IconButton onClick={() => handleRemoveFromCart(course)}>
                <DeleteIcon />
            </IconButton>
        </Stack>
    )
}

export default CourseInCart