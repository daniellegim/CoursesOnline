import {Icon,Grid, Container,Button, Card, CardActions, CardContent, CardHeader, Accordion,AccordionSummary,AccordionDetails, Rating, Typography } from "@mui/material"
import { AddShoppingCart } from '@mui/icons-material'
// import { Grid } from "@mui/material"
import { useCartFunctions } from "../ShoppingCart/CartContext"
import { useStyles } from "./style"
import React from "react"
import { ArrowForwardIosSharp, PaidOutlined,CalendarMonthOutlined,PersonOutlineOutlined } from "@mui/icons-material"

const Course = (props) => {
    const classes = useStyles()
    const course = props.course
    const { addToCart } = useCartFunctions()
    const [expanded, setExpanded] = React.useState("description");
    const handleAddToCart = (course) => {
        addToCart(course)
    }
    const handleChange = (panel) => (event,newExpanded) =>{
        setExpanded(newExpanded?panel:false);
    }

    return (
        <Container className={classes.containerClass}>
            <Card key={course._id} className={classes.card} variant="outlined" >

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
                <div
                className={classes.centerCss} 
                >
                    <img src ={course.imgURL} alt={course.title}></img>
                </div>
                <CardContent>
                    <Card >
                        <CardContent className={classes.bannerCard}>
                        <Grid container spacing={2} sx={{ overflow: "auto", maxHeight: "73vh" }}>
                            <Grid className={classes.bannerItem} key="duration" item xs={4}>
                                <CalendarMonthOutlined className={classes.iconClass} fontSize="large"></CalendarMonthOutlined>
                                <Typography variant="h5">{course.duration}</Typography>
                            </Grid>
                            <Grid className={classes.bannerItem} key="Level" item xs={4}>
                                    <PersonOutlineOutlined className={classes.iconClass} fontSize="large"></PersonOutlineOutlined>
                                    <Typography variant="h5">{(course.level)?course.level.name:"Not Provide"}</Typography>
                            </Grid>
                            <Grid className={classes.bannerItem} key="Price" item xs={4}>
                                <PaidOutlined className={classes.iconClass} fontSize="large"></PaidOutlined>
                                <Typography variant="h5">{course.price}</Typography>
                            </Grid>
                        </Grid>
                        </CardContent>
                    </Card>
                    <Accordion elevation={0} expanded={expanded === 'description'} onChange={handleChange('description')}>
                        <AccordionSummary expandIcon={<ArrowForwardIosSharp/>}>
                            <Typography variant="h5">Description</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h6">{course.description}</Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion elevation={0} expanded={expanded === 'about'} onChange={handleChange('about')}>
                        <AccordionSummary expandIcon={<ArrowForwardIosSharp/>}>
                            <Typography variant="h5">About The Course</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h6">{course.about}</Typography>
                        </AccordionDetails>
                    </Accordion>
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
        </Container>
    )
}

export default Course