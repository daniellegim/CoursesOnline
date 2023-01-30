import { Button, Grid, Typography } from "@mui/material"
import { useState } from "react"
import CategoryChart from "./Chart"
import CreateCourse from "./CreateCourse"

const Admin = () => {
    const [displayForm, setDisplayForm] = useState(false)

    const handleCreateButton = () => {
        setDisplayForm(true)
    }

    const handleCancel = () => {
        setDisplayForm(false)
    }

    return (
        <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "1em" }}>
            <Grid item xs={5.2} />
            <Grid item xs={2}>
                {displayForm ?
                    <Typography variant="h4">הוספת קורס</Typography>
                    :
                    <Button variant="contained" onClick={handleCreateButton}>הוספת קורס חדש</Button>
                }
            </Grid>
            <Grid item xs={4.8} />
            {displayForm &&
                <Grid item xs={4}>
                    <CreateCourse handleCancel={handleCancel} />
                </Grid>
            }
            {!displayForm &&
                <Grid item>
                    <CategoryChart />
                </Grid>
            }
        </Grid>
    )
}

export default Admin