import { Button, Grid, Typography } from "@mui/material"
import { useState } from "react"
import CategoryChart from "./Chart"
import CreateCourse from "./CreateCourse"
import ListManageCourse from "./ListManageCourse"
import EditCourse from "./EditCourse"
import DeleteCourse from "./DeleteCourse"

const Admin = () => {
    const [selectedCourse, setselectedCourse] = useState({})
    const [displayForm, setDisplayForm] = useState(false)
    const [displayListForm, setDisplayListForm] = useState(false)
    const [displayEditForm, setDisplayEditForm] = useState(false)
    const [displayDeleteForm, setDisplayDeleteForm] = useState(false)

    const handleCreateButton = () => {
        setDisplayForm(true)
        setDisplayListForm(false);
        setDisplayEditForm(false);
        setDisplayDeleteForm(false);
    }
    const handleListButton = () => {
        setDisplayForm(false)
        setDisplayListForm(true);
        setDisplayEditForm(false);
        setDisplayDeleteForm(false);
    }
    const handleEditButton = (course) => {
        setDisplayForm(false)
        setDisplayListForm(false);
        setDisplayEditForm(true);
        setDisplayDeleteForm(false);
        setselectedCourse(course)
    }
    const handleDeleteButton = (course) => {
        setDisplayForm(false)
        setDisplayListForm(false);
        setDisplayEditForm(false);
        setDisplayDeleteForm(true);
        setselectedCourse(course)
    }

    const handleCancel = () => {
        setDisplayForm(false)
        setDisplayListForm(false);
        setDisplayEditForm(false);
        setDisplayDeleteForm(false);
    }

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "1em" }}>
            <Grid item xs={5.2} />
            <Grid item xs={2.8}>
                {displayForm ?
                    <Typography variant="h4">הוספת קורס</Typography>
                    :
                    <Button variant="contained" onClick={handleCreateButton}>הוספת קורס חדש</Button>
                }
                {displayListForm ?
                    <Typography variant="h4">ניהול קורסים</Typography>
                    :
                    <Button variant="contained" onClick={handleListButton}>ניהול קורסים</Button>
                }

                {!displayListForm && !displayForm && !displayEditForm && !displayDeleteForm?
                    <Typography variant="h4">סטייסטיקות</Typography>
                    :
                    <Button variant="contained" onClick={handleCancel}>לסטייסטיקות</Button>
                }
            </Grid>
            <Grid item xs={4} />
            {displayForm &&
                <Grid item xs={4}>
                    <CreateCourse handleCancel={handleCancel} />
                </Grid>
            }
            {displayListForm &&
                <Grid item xs={4}>
                    <ListManageCourse handleEdit={handleEditButton} handleDelete={handleDeleteButton}/>
                </Grid>
            }
            {!displayForm && !displayListForm && !displayEditForm && !displayDeleteForm &&
                <Grid item>
                    <CategoryChart />
                </Grid>
            }
            {displayEditForm &&
                <Grid item>
                    <EditCourse course={selectedCourse} handleCancel={handleCancel} />
                </Grid>
            }
            {displayDeleteForm &&
                <Grid item>
                    <DeleteCourse course={selectedCourse} handleCancel={handleCancel} />
                </Grid>
            }
            
        </Grid>
    )
}

export default Admin