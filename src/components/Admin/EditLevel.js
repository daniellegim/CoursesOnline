import { LoadingButton } from "@mui/lab"
import { Autocomplete, Button, Stack, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import LevelServer from "../../serverAPI/level"

const EditLevel = () => {
    const [level, setLevel] = useState("")
    const [selectedLevel, setSelectedLevel] = useState("")
    const [levels, setLevels] = useState([])
    const [loadingSave, setLoadingSave] = useState(false)
    const [levelSaved, setLevelSaved] = useState(false)
    const [saveButton, setSaveButton] = useState({ text: "שמור", color: "primary" })

    useEffect(() => {
        const getData = async () => {
            const data = await LevelServer.getAllLevels()

            setLevels(data)
        }

        getData()
    }, [levelSaved])

    const handleLevelChange = (event) => {
        setLevel(event.target.value)
    }

    const handleSelectLevel = (event, newValue) => {
        setSelectedLevel(newValue)
        setLevel(newValue.name)
    }

    const handleSave = async () => {
        setLoadingSave(true)

        const data = await LevelServer.updateLevel({ _id: selectedLevel._id, name: level })

        if (data.status === 200) {
            setLoadingSave(false)
            setSaveButton({ text: "נשמר בהצלחה", color: "success" })
            setLevelSaved(!levelSaved)
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
        setSelectedLevel("")
    }

    return (
        <Stack direction="column" spacing={2} sx={{ marginTop: "2em" }}>
            <Autocomplete
                disablePortal
                options={levels}
                getOptionLabel={(option) => option.name}
                value={selectedLevel || null}
                onChange={handleSelectLevel}
                renderInput={(params) => <TextField {...params} label="בחר רמה לעריכה" />}
            />
            <TextField
                label="שם רמה"
                disabled={selectedLevel === ""}
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

export default EditLevel