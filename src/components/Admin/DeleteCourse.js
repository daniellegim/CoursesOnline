import { LoadingButton } from "@mui/lab"
import { Autocomplete, Button, Rating, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import CategoryServer from "../../serverAPI/category"
import CourseServer from "../../serverAPI/course"

const DeleteCourse = (props) => {
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

        console.log(course)
        const data = await CourseServer.deleteCourse(course)

        if (data.status === 200) {
            setLoadingSave(false)
            setSaveButton({ text: "נמחק בהצלחה", color: "success" })
            props.handleCancel();
        } else {
            setLoadingSave(false)
            setSaveButton({ text: "שגיאה", color: "error" })
        }

        window.setTimeout(() => {
            setSaveButton({ text: "שמור", color: "primary" })
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
                disabled
            />
            <TextField
                label="תיאור"
                multiline
                value={course.description || ""}
                onChange={handleValueChange("description")}
                disabled
            />
            <TextField
                label="כותב הקורס"
                value={course.author || ""}
                onChange={handleValueChange("author")}
                disabled
            />
            <TextField
                label="מחיר"
                type="number"
                value={course.price || 0}
                onChange={handleValueChange("price")}
                disabled
            />
            <Autocomplete
                disablePortal
                options={categories}
                getOptionLabel={(option) => option.name}
                value={course.category || null}
                onChange={handleValueChange("category")}
                renderInput={(params) => <TextField {...params} label="קטגוריה" />}
                disabled
            />
            <Typography>{"ציון"}</Typography>
            <Rating
                precision={0.5}
                value={course.rating || 0}
                onChange={handleValueChange("rating")}
                disabled
            />
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="outlined" sx={{ width: "100%" }} onClick={props.handleCancel}>בטל</Button>
                <LoadingButton
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

export default DeleteCourse