import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"

const Course = (props) => {
    const course = props.course

    return (
        <Card key={course.id}>
            <CardHeader title={course.name} />
            <CardContent>
                <Grid container direction="row">
                    <Grid item xs={11}>
                        <Typography variant="h6">{course.description}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography variant="h6">{course.price}₪</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Course