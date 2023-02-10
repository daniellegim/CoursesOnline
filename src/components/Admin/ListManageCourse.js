import { LoadingButton } from "@mui/lab"
import {Card, Autocomplete, Button, Rating, Stack, TextField, Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow, CardContent, TablePagination } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react"
import CourseServer from "../../serverAPI/course"

const ListManageCourse = (props) => {
    const [course, setCourse] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [loadingSave, setLoadingSave] = useState(false)
    const [saveButton, setSaveButton] = useState({ text: "שמור", color: "primary" })
    const courseFields = ["name", "description", "price", "category", "rating", "author"]

    useEffect(() => {
        const getData = async () => {
            const data = await CourseServer.getAllCourses()
            setCourse(data)
            console.log(data);
        }

        getData()
    }, [])

    // const handleValueChange = (field) => (event, newValue) => {
    //     setCourse(prev => ({
    //         ...prev,
    //         [field]: field === "category" ? newValue :
    //             (field === "rating" ? Number(event.target.value) : event.target.value)
    //     }))
    // }

    const checkDisabled = () => {
        const emptyValues = courseFields.filter(key => course[key] === undefined || course[key] === null || course[key] === "")
        return emptyValues.length > 0
    }

    const handleChangePage =(event,newPage) =>{
        setPage(newPage);
    }
    
    const handleChangeRowsPerPage =(event) =>{
        setRowsPerPage(event.target.value,10);
        setPage(0);
    }
    const handleSave = async () => {
        setLoadingSave(true)

        const data = await CourseServer.addCourse(course)

        if (data.status === 200) {
            setLoadingSave(false)
            setSaveButton({ text: "נשמר בהצלחה", color: "success" })
            window.setTimeout(() => {
                clearCourse()
            }, 2000)
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
        // <TableContainer component={Paper}>
        <div>
            <Table size="small">
                <TableHead>
                <TableCell component="th">Name</TableCell>
                <TableCell component="th">Price</TableCell>
                <TableCell component="th">Author</TableCell>
                <TableCell component="th">Rating</TableCell>
                <TableCell component="th">Category</TableCell>
                <TableCell component="th">Edit</TableCell>
                <TableCell component="th">Delete</TableCell>
                </TableHead>
                <TableBody>
                    {course?.slice(page*rowsPerPage,page*rowsPerPage + rowsPerPage).map((c) =>(
                        <TableRow>
                            <TableCell >{c.name}</TableCell>
                            <TableCell >{c.price}</TableCell>
                            <TableCell >{c.author}</TableCell>
                            <TableCell >{c.rating}</TableCell>
                            <TableCell >{(c.category)?c.category.name:""}</TableCell>
                            <TableCell ><Button onClick={() => props.handleEdit(c)} >Edit</Button></TableCell>
                            <TableCell ><Button onClick={() => props.handleDelete(c)} >Delete</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TablePagination rowsPerPage={[5,10,25]}
                                 component="div"
                                 count={course.length}
                                 rowsPerPage={rowsPerPage}
                                 page={page}
                                 onPageChange={handleChangePage}
                                 onRowsPerPageChange={handleChangeRowsPerPage}></TablePagination>
            </Table>
        </div>
        // </TableContainer>
    )
}

export default ListManageCourse