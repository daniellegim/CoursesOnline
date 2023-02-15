import { LoadingButton } from "@mui/lab"
import { Button, Stack, TextField } from "@mui/material"
import { useState } from "react"
import LevelServer from "../../serverAPI/level"

const CreateLevel = () => {
    const [level, setLevel] = useState("")
    const [loadingSave, setLoadingSave] = useState(false)
    const [saveButton, setSaveButton] = useState({ text: "שמור", color: "primary" })

    const handleLevelChange = (event) => {
        setLevel(event.target.value)
    }

    const handleSave = async () => {
        setLoadingSave(true)

        const data = await LevelServer.addLevel({ name: level })

        if (data.status === 200) {
            setLoadingSave(false)
            setSaveButton({ text: "נשמר בהצלחה", color: "success" })
            window.setTimeout(() => {
                clearLevel()
            }, 2000)
        } else {
            setLoadingSave(false)
            setSaveButton({ text: "שגיאה", color: "error" })
        }

        window.setTimeout(() => {
            setSaveButton({ text: "שמור", color: "primary" })
        }, 2000)
    }

    const clearLevel = () => {
        setLevel("")
    }

    return (
        <Stack direction="column" spacing={2} sx={{ marginTop: "2em" }}>
            <TextField
                label="שם רמה"
                value={level}
                onChange={handleLevelChange}
            />
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="outlined" sx={{ width: "100%" }} onClick={clearLevel}>בטל</Button>
                <LoadingButton
                    disabled={level === ""}
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

export default CreateLevel