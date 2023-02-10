import { useContext, useState } from "react"
import { Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCartContext, useCartFunctions } from "./CartContext"
import CoursesListCart from "./CoursesListCart"
import UserCourseServer from "../../serverAPI/userCourses"
import { LoadingButton } from "@mui/lab"
import AuthContext from "../../store/auth-context"

const ShoppingCart = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [loadingSave, setLoadingSave] = useState(false)
    const [saveButton, setSaveButton] = useState({ text: "קנה", color: "primary" })
    const coursesInCart = useCartContext()
    const { clearCart } = useCartFunctions()
    const authCtx = useContext(AuthContext)
    const totalPrice = coursesInCart.reduce((prev, current) => {
        return prev + current.price
    }, 0)

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = async (event) => {
        if (event.currentTarget.id === "yes") {
            setLoadingSave(true)
            const courses = coursesInCart.map(course => ({
                userId: authCtx.userId,
                courseId: course._id
            }))

            const data = await UserCourseServer.addUserCourses(courses)

            if (data.status === 200) {
                setLoadingSave(false)
                setSaveButton({ text: "נקנה בהצלחה", color: "success" })
                window.setTimeout(() => {
                    clearCart()
                }, 2000)
            } else {
                setLoadingSave(false)
                setSaveButton({ text: "שגיאה", color: "error" })
            }

            window.setTimeout(() => {
                setSaveButton({ text: "קנה", color: "primary" })
                setOpenDialog(false)
            }, 2000)
        } else {
            setOpenDialog(false)
        }
    }

    return (
        <>
            <Badge badgeContent={coursesInCart.length} color="primary">
                <Fab color="secondary" onClick={handleOpenDialog} sx={{ marginLeft: "6em" }}>
                    <ShoppingCartIcon />
                </Fab>
            </Badge>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="xs"
                sx={{ marginLeft: "65em", marginBottom: "12em" }}
            >
                <DialogTitle>עגלת קניות</DialogTitle>
                <DialogContent>
                    <CoursesListCart courses={coursesInCart} />
                    {coursesInCart.length ?
                        <Typography variant="h6" sx={{ marginTop: "1em", marginLeft: "9em" }}>סה"כ לתשלום: {totalPrice}</Typography>
                        : null
                    }
                </DialogContent>
                {coursesInCart.length ?
                    <DialogActions>
                        <Button id="no" onClick={handleCloseDialog}>בטל</Button>
                        <LoadingButton
                            id="yes"
                            loading={loadingSave}
                            loadingPosition="center"
                            variant="contained"
                            color={saveButton.color}
                            onClick={handleCloseDialog}
                        >
                            {saveButton.text}
                        </LoadingButton>
                    </DialogActions>
                    : null
                }
            </Dialog>
        </>
    )
}

export default ShoppingCart