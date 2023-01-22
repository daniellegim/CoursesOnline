import { Button, Card, CardActions, CardContent, CardHeader, Rating, Typography } from "@mui/material"
import { AddShoppingCart } from '@mui/icons-material'
import { useCartFunctions } from "../ShoppingCart/CartContext"

const Course = (props) => {
    const course = props.course
    const { addToCart } = useCartFunctions()

    const handleAddToCart = (course) => {
        addToCart(course)
    }

    return (
        <Card key={course._id}>
            <CardHeader
                title={course.name}
                action={
                    <Typography variant="h6" sx={{ marginRight: "1em", marginTop: "0.5em" }}>{course.price}₪</Typography>
                }
                subheader={
                    <>
                        <Typography>{course.author}</Typography>
                        <Typography >{course.category}</Typography>
                    </>
                }
            />
            <CardContent>
                <Typography variant="h6">{course.description}</Typography>
            </CardContent>
            <CardActions>
                <Rating value={course.rating} precision={0.5} readOnly />
                <Button
                    variant="contained"
                    endIcon={<AddShoppingCart />}
                    onClick={() => handleAddToCart(course)}
                    sx={{ marginLeft: "auto" }} >
                    הוספה לסל
                </Button>
            </CardActions>
        </Card>
    )
}

export default Course