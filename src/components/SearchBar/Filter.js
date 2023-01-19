import { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { FilterAlt } from '@mui/icons-material'
import CheckboxList from './Checkbox'
import SliderFilter from './Slider'

const filtersList = {
    price: {
        min: 0,
        max: 400
    }
}

const Filter = (props) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [filters, setFilters] = useState(filtersList)
    const [maxPrice, setMaxPrice] = useState()

    useEffect(() => {
        const max = Math.max(...props.courses.map(course => course.price))
        setMaxPrice(max)
    }, [props.courses])

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = (event) => {
        if (event.currentTarget.id === "yes") {
            // const checked = Object.entries(filters).reduce((obj, [key, list]) => {
            //     return {
            //         ...obj,
            //         [key]: Object.entries(list).filter(([listName, value]) => value)
            //             .reduce((arr, [keyList, value]) => {
            //                 return [...arr, keyList]
            //             }, [])
            //     }
            // }, {})

            props.filterCoursePrice(filters["price"])
        }

        setOpenDialog(false)
    }

    const handleCheckChange = (event, listName) => {
        setFilters(prev => ({
            ...prev,
            [listName]: {
                ...prev[listName],
                [event.target.name]: event.target.checked
            }
        }))
    }

    const handleSliderChange = (event, newValue) => {
        setFilters(prev => ({
            ...prev,
            price: {
                min: newValue[0],
                max: newValue[1]
            }
        }))
    }

    return (
        <>
            <IconButton onClick={handleOpenDialog}>
                <FilterAlt fontSize="large" />
            </IconButton>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>מסננים</DialogTitle>
                <DialogContent>
                    {/* <CheckboxList listName="price" label="מחיר" list={filters["price"]} handleCheckChange={handleCheckChange} /> */}
                    <SliderFilter label="מחיר" max={maxPrice} list={filters["price"]} handleSliderChange={handleSliderChange} />
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