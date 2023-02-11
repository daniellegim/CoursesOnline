import { LoadingButton } from "@mui/lab"
import { Autocomplete, Button, Stack, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import CategoryServer from "../../serverAPI/category"

const EditCategory = () => {
    const [category, setCategory] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [loadingSave, setLoadingSave] = useState(false)
    const [categorySaved, setCategorySaved] = useState(false)
    const [saveButton, setSaveButton] = useState({ text: "שמור", color: "primary" })

    useEffect(() => {
        const getData = async () => {
            const data = await CategoryServer.getAllCategories()

            setCategories(data)
        }

        getData()
    }, [categorySaved])

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }

    const handleSelectCategory = (event, newValue) => {
        setSelectedCategory(newValue)
        setCategory(newValue.name)
    }

    const handleSave = async () => {
        setLoadingSave(true)

        const data = await CategoryServer.updateCategory({ _id: selectedCategory._id, name: category })

        if (data.status === 200) {
            setLoadingSave(false)
            setSaveButton({ text: "נשמר בהצלחה", color: "success" })
            setCategorySaved(!categorySaved)
            window.setTimeout(() => {
                clearCategory()
            }, 2000)
        } else {
            setLoadingSave(false)
            setSaveButton({ text: "שגיאה", color: "error" })
        }

        window.setTimeout(() => {
            setSaveButton({ text: "שמור", color: "primary" })
        }, 2000)
    }

    const clearCategory = () => {
        setCategory("")
        setSelectedCategory("")
    }

    return (
        <Stack direction="column" spacing={2} sx={{ marginTop: "2em" }}>
            <Autocomplete
                disablePortal
                options={categories}
                getOptionLabel={(option) => option.name}
                value={selectedCategory || null}
                onChange={handleSelectCategory}
                renderInput={(params) => <TextField {...params} label="בחר קטגוריה לעריכה" />}
            />
            <TextField
                label="שם קטגוריה"
                disabled={selectedCategory === ""}
                value={category}
                onChange={handleCategoryChange}
            />
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="outlined" sx={{ width: "100%" }} onClick={clearCategory}>בטל</Button>
                <LoadingButton
                    disabled={category === ""}
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

export default EditCategory