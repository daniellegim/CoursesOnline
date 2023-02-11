import { Button, Card, CardActions, CardContent, CardHeader, Rating, Typography } from "@mui/material"
import { AddShoppingCart } from '@mui/icons-material'
import { useCartFunctions } from "../ShoppingCart/CartContext"
import { useStyles } from "./style"

const Course = (props) => {
    const classes = useStyles()
    const course = props.course
    const { addToCart } = useCartFunctions()

    const handleAddToCart = (course) => {
        addToCart(course)
    }

    const raiseNavigateEvent = () => {
        props.navigateProduct(course);
    }

    return (
        <Card key={course._id} className={classes.card}>
            <CardHeader
                title={course.name}
                action={
                    <Typography variant="h6" sx={{ marginRight: "1em", marginTop: "0.5em" }}>{course.price}₪</Typography>
                }
                subheader={
                    <>
                        <Typography>{course.author}</Typography>
                        <Typography >{course.category.name}</Typography>
                    </>
                }
            />
            <CardContent onClick={raiseNavigateEvent}>
                {course.imgURL &&
                    <div className={classes.imageCourseDiv} >
                        <img className={classes.imageCourse} src={course.imgURL} alt={course.title}></img>
                    </div>
                }
                <Typography variant="h6">
                    {course.description.length > 100 ? `${course.description.substring(0, 100)}...` : course.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Rating value={course.rating} precision={0.5} readOnly />
                {!props.userCourses ?
                    <Button
                        variant="contained"
                        endIcon={<AddShoppingCart />}
                        onClick={() => handleAddToCart(course)}
                        sx={{ marginLeft: "auto" }} >
                        הוספה לסל
                    </Button>
                    : null
                }
            </CardActions>
        </Card>
    )
}

export default Course