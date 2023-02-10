import { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material'
import { FilterAlt } from '@mui/icons-material'
import CheckboxList from './Checkbox'
import SliderFilter from './Slider'
import RatingFilter from './Rating'
import AutocompleteFilter from './Autocomplete'
import CategoryServer from '../../serverAPI/category'

const Filter = (props) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [filters, setFilters] = useState({})
    const [categories, setCategories] = useState()
    const [maxPrice, setMaxPrice] = useState()

    useEffect(() => {
        const max = Math.max(...props.courses.map(course => course.price))
        setMaxPrice(max)
    }, [props.courses])

    useEffect(() => {
        const getData = async () => {
            const data = await CategoryServer.getAllCategories()

            setCategories(data)
        }

        getData()
    }, [])

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

            props.filterCourses(filters)
        }

        setOpenDialog(false)
    }

    // const handleCheckChange = (event, listName) => {
    //     setFilters(prev => ({
    //         ...prev,
    //         [listName]: {
    //             ...prev[listName],
    //             [event.target.name]: event.target.checked
    //         }
    //     }))
    // }

    const handleSliderChange = (event, newValue) => {
        setFilters(prev => ({
            ...prev,
            price: {
                min: newValue[0],
                max: newValue[1]
            }
        }))
    }

    const handleValueChange = (filterName) => (event, newValue) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: {
                value: newValue
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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <AutocompleteFilter
                                label="קטגוריות"
                                filterName="category"
                                options={categories}
                                filter={filters["category"]}
                                handleValueChange={handleValueChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SliderFilter
                                label="מחיר"
                                max={maxPrice}
                                list={filters["price"]}
                                handleSliderChange={handleSliderChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RatingFilter
                                label="ציון"
                                filterName="rating"
                                filter={filters["rating"]}
                                handleValueChange={handleValueChange}
                            />
                        </Grid>
                    </Grid>
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