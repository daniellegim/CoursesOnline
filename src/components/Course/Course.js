import { Card, CardContent, CardHeader, Typography } from "@mui/material"

const Course = (props) => {
    const course = props.course
    
    return (
        <Card key={course.id}>
            <CardHeader title={course.name} />
            <CardContent>
                <Typography>{course.description}</Typography>
            </CardContent>
        </Card>
    )
}

export default Course