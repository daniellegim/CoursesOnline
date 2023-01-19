import { Fab } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useStyles } from "./style"

const ShoppingCart = () => {
    const classes = useStyles()

    return (
        <Fab className={classes.fab} color="secondary">
            <ShoppingCartIcon />
        </Fab>
    )
}

export default ShoppingCart