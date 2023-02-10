import { LoadingButton } from "@mui/lab"
import { Autocomplete, Button, Rating, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import CategoryServer from "../../serverAPI/category"
import CourseServer from "../../serverAPI/course"

const EditCourse = (props) => {
    const [course, setCourse] = useState(props.course)
    const [categories, setCategories] = useState([])
    const [loadingSave, setLoadingSave] = useState(false)
    const [saveButton, setSaveButton] = useState({ text: "שמור", color: "primary" })
    const courseFields = ["name", "description", "price", "category", "rating", "author"]

    useEffect(() => {
        const getData = async () => {
            const data = await CategoryServer.getAllCategories()

            setCategories(data)
        }

        getData()
    }, [])

    const handleValueChange = (field) => (event, newValue) => {
        setCourse(prev => ({
            ...prev,
            [field]: field === "category" ? newValue :
                (field === "rating" ? Number(event.target.value) : event.target.value)
        }))
    }

    const checkDisabled = () => {
        const emptyValues = courseFields.filter(key => course[key] === undefined || course[key] === null || course[key] === "")
        return emptyValues.length > 0
    }
    const handleSave = async () => {
        setLoadingSave(true)

        const data = await CourseServer.updateCourse(course)

        if (data.status === 200) {
            setLoadingSave(false)
            setSaveButton({ text: "עודכן בהצלחה", color: "success" })
            props.handleCancel();
        } else {
            setLoadingSave(false)
            setSaveButton({ text: "שגיאה", color: "error" })
        }

        window.setTimeout(() => {
            setSaveButton({ text: "עדכן", color: "primary" })
        }, 2000)
    }

    const clearCourse = () => {
        setCourse({})
    }

    return (
        <Stack direction="column" spacing={2} sx={{ overflow: "auto", maxHeight: "73vh" }}>
            <TextField
                label="שם הקורס"
                value={course.name || ""}
                onChange={handleValueChange("name")}
            />
            <TextField
                label="תיאור"
                multiline
                value={course.description || ""}
                onChange={handleValueChange("description")}
            />
            <TextField
                label="כותב הקורס"
                value={course.author || ""}
                onChange={handleValueChange("author")}
            />
            <TextField
                label="מחיר"
                type="number"
                value={course.price || 0}
                onChange={handleValueChange("price")}
            />
            <Autocomplete
                disablePortal
                options={categories}
                getOptionLabel={(option) => option.name}
                value={course.category || null}
                onChange={handleValueChange("category")}
                renderInput={(params) => <TextField {...params} label="קטגוריה" />}
            />
            <Typography>{"ציון"}</Typography>
            <Rating
                precision={0.5}
                value={course.rating || 0}
                onChange={handleValueChange("rating")}
            />
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="outlined" sx={{ width: "100%" }} onClick={props.handleCancel}>בטל</Button>
                <LoadingButton
                    disabled={checkDisabled()}
                    loading={loadingSave}
                    loadingPosition="center"
                    variant="contained"
                    color={saveButton.color}
                    onClick={handleSave}
                    sx={{ width: "100%" }}
                >
                    {saveButton.text}
                </LoadingButton>
            </Stack>
        </Stack>
    )
}

export default EditCourse