import { useState, useContext } from "react"
import { Button, Grid, Paper, Stack, Tab, Tabs, Card, CardContent, CardHeader, Typography } from "@mui/material"
import CategoryChart from "./Chart"
import CreateCourse from "./CreateCourse"
import ListManageCourse from "./ListManageCourse"
import EditCourse from "./EditCourse"
import DeleteCourse from "./DeleteCourse"
import CreateCategory from "./CreateCategory"
import AuthContext from '../../store/auth-context';
import EditCategory from "./EditCategory"
import CreateLevel from "./CreateLevel"
import EditLevel from "./EditLevel"
const Admin = () => {
    const authCtx = useContext(AuthContext);
    const [currentTab, setCurrentTab] = useState(0)
    const [selectedCourse, setselectedCourse] = useState({})
    const [displayEditForm, setDisplayEditForm] = useState(false)
    const [displayDeleteForm, setDisplayDeleteForm] = useState(false)
    const [displayAddCourse, setDisplayAddCourse] = useState(false)
    const [displayAddCategory, setDisplayAddCategory] = useState(false)
    const [displayEditCategory, setDisplayEditCategory] = useState(false)
    const [displayAddLevel, setDisplayAddLevel] = useState(false)
    const [displayEditLevel, setDisplayEditLevel] = useState(false)
    const [numberOfClients, setNumberOfClients] = useState(0)

    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue)
    }

    authCtx.socket.on("connectedUsersCount", async (msg) => {
        setNumberOfClients(msg);
    })
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

    const handleAddLevel = () => {
        setDisplayAddLevel(true)
        setDisplayEditLevel(false)
    }

    const handleEditLevel = () => {
        setDisplayEditLevel(true)
        setDisplayAddLevel(false)
    }

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "0.5em" }}>
            <Paper sx={{ width: "100%" }}>
                <Tabs value={currentTab} onChange={handleChangeTab} centered>
                    <Tab label="סטטיסטיקות" />
                    <Tab label="ניהול קורסים" />
                    <Tab label="ניהול קטגוריות" />
                    <Tab label="ניהול רמות קורס" />
                </Tabs>
            </Paper>
            {currentTab === 0 ? (
                <Grid item container>
                    <Grid item xs={0.3} />
                    <Grid item>
                        <Card>
                            <CardHeader title="מספר משתמשים מחוברים" />
                            <CardContent>
                                <Typography variant="h5">{numberOfClients}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={0.6} />
                    <Grid item>
                        <CategoryChart />
                    </Grid>
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

            ) : currentTab === 2 ? (
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
            ) : (
                <Grid item xs={4}>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained" onClick={handleAddLevel}>הוספת רמה</Button>
                        <Button variant="contained" onClick={handleEditLevel}>עריכת רמה</Button>
                    </Stack>
                    {displayAddLevel &&
                        <CreateLevel />
                    }
                    {displayEditLevel &&
                        <EditLevel />
                    }
                </Grid>
            )
            }
        </Grid>
    )
}

export default Admin