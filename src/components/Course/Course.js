import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from "@mui/material"
import { AddShoppingCart } from '@mui/icons-material'

const Course = (props) => {
    const course = props.course

    return (
        <Card key={course._id}>
            <CardHeader
                title={course.name}
                action={
                    <Typography variant="h6" sx={{ marginRight: "1em", marginTop: "0.5em" }}>{course.price}₪</Typography>
                }
            />
            <CardContent>
                {/* <Grid container direction="row">
                    <Grid item xs={11}> */}
                <Typography variant="h6">{course.description}</Typography>
                {/* </Grid>
                </Grid> */}
            </CardContent>
            <CardActions>
                <Button variant="contained" sx={{ marginLeft: "auto" }} endIcon={<AddShoppingCart />}>
                    הוספה לסל
                </Button>
            </CardActions>
        </Card>
    )
}

export default Course