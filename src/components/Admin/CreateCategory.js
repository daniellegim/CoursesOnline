import { LoadingButton } from "@mui/lab"
import { Button, Stack, TextField } from "@mui/material"
import { useState } from "react"
import CategoryServer from "../../serverAPI/category"

const CreateCategory = () => {
    const [category, setCategory] = useState("")
    const [loadingSave, setLoadingSave] = useState(false)
    const [saveButton, setSaveButton] = useState({ text: "שמור", color: "primary" })

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }

    const handleSave = async () => {
        setLoadingSave(true)

        const data = await CategoryServer.addCategory({ name: category })

        if (data.status === 200) {
            setLoadingSave(false)
            setSaveButton({ text: "נשמר בהצלחה", color: "success" })
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
    }

    return (
        <Stack direction="column" spacing={2} sx={{ marginTop: "2em" }}>
            <TextField
                label="שם קטגוריה"
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

export default CreateCategory