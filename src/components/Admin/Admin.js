import { useState } from "react"
import { Button, Grid, Paper, Stack, Tab, Tabs } from "@mui/material"
import CategoryChart from "./Chart"
import CreateCourse from "./CreateCourse"
import ListManageCourse from "./ListManageCourse"
import EditCourse from "./EditCourse"
import DeleteCourse from "./DeleteCourse"
import CreateCategory from "./CreateCategory"
import EditCategory from "./EditCategory"

const Admin = () => {
    const [currentTab, setCurrentTab] = useState(0)
    const [selectedCourse, setselectedCourse] = useState({})
    const [displayEditForm, setDisplayEditForm] = useState(false)
    const [displayDeleteForm, setDisplayDeleteForm] = useState(false)
    const [displayAddCourse, setDisplayAddCourse] = useState(false)
    const [displayAddCategory, setDisplayAddCategory] = useState(false)
    const [displayEditCategory, setDisplayEditCategory] = useState(false)

    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue)
    }

    const handleEditButton = (course) => {
        setDisplayEditForm(true)
        setDisplayDeleteForm(false)
        setselectedCourse(course)
    }

    const handleDeleteButton = (course) => {
        setDisplayEditForm(false)
        setDisplayDeleteForm(true)
        setselectedCourse(course)
    }

    const handleCancel = () => {
        setDisplayAddCourse(false)
        setDisplayEditForm(false)
        setDisplayDeleteForm(false)
    }

    const handleAddCourse = () => {
        setDisplayAddCourse(true)
    }

    const handleAddCategory = () => {
        setDisplayAddCategory(true)
        setDisplayEditCategory(false)
    }

    const handleEditCategory = () => {
        setDisplayEditCategory(true)
        setDisplayAddCategory(false)
    }

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "0.5em" }}>
            <Paper sx={{ width: "100%" }}>
                <Tabs value={currentTab} onChange={handleChangeTab} centered>
                    <Tab label="סטטיסטיקות" />
                    <Tab label="ניהול קורסים" />
                    <Tab label="ניהול קטגוריות" />
                </Tabs>
            </Paper>
            {currentTab === 0 ? (
                <Grid item>
                    <CategoryChart />
                </Grid>
            ) : currentTab === 1 ? (
                <Grid item xs={(displayAddCourse || displayEditForm || displayDeleteForm) ? 4 : 12}>
                    {displayAddCourse ?
                        <CreateCourse handleCancel={handleCancel} />
                        : (displayEditForm ?
                            <EditCourse course={selectedCourse} handleCancel={handleCancel} />
                            : (displayDeleteForm ?
                                <DeleteCourse course={selectedCourse} handleCancel={handleCancel} />
                                : (
                                    <>
                                        <Button variant="contained" onClick={handleAddCourse} sx={{ marginLeft: "1em" }}>הוספת קורס</Button>
                                        <ListManageCourse handleEdit={handleEditButton} handleDelete={handleDeleteButton} />
                                    </>
                                )
                            ))
                    }
                </Grid>

            ) : (
                <Grid item xs={4}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained" onClick={handleAddCategory}>הוספת קטגוריה</Button>
                        <Button variant="contained" onClick={handleEditCategory}>עריכת קטגוריה</Button>
                    </Stack>
                    {displayAddCategory &&
                        <CreateCategory />
                    }
                    {displayEditCategory &&
                        <EditCategory />
                    }
                </Grid>
            )}
        </Grid>
    )
}

export default Admin