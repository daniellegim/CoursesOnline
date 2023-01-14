import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { FilterAlt } from '@mui/icons-material'
import CheckboxList from './Checkbox'

const filtersList = {
    price: {
        "100-200": false,
        "200-300": false
    }
}

const Filter = (props) => {
    const [open, setOpen] = useState(false)
    const [filters, setFilters] = useState(filtersList)

    const handleOpenDialog = () => {
        setOpen(true)
    }

    const handleCloseDialog = (event) => {
        if (event.currentTarget.id === "yes") {
            const checked = Object.entries(filters).reduce((obj, [key, list]) => {
                return {
                    ...obj,
                    [key]: Object.entries(list).filter(([listName, value]) => value)
                        .reduce((arr, [keyList, value]) => {
                            return [...arr, keyList]
                        }, [])
                }
            }, {})

            props.filterCoursePrice(checked)
        }

        setOpen(false)
    }

    const handleCheckChange = (event, listName) => {
        setFilters({
            ...filters,
            [listName]: {
                ...filters[listName],
                [event.target.name]: event.target.checked
            }
        })
    }

    return (
        <>
            <IconButton onClick={handleOpenDialog}>
                <FilterAlt fontSize="large" />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>מסננים</DialogTitle>
                <DialogContent>
                    <CheckboxList listName="price" label="מחיר" list={filters["price"]} handleCheckChange={handleCheckChange} />
                </DialogContent>
                <DialogActions>
                    <Button id="no" onClick={handleCloseDialog}>בטל</Button>
                    <Button id="yes" onClick={handleCloseDialog} variant="contained">
                        החל
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Filter