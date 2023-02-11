import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) =>
    createStyles({
        menu: {
            color: "black",
            textDecoration: "none"
        },
        authButton:{
            color: "white",
            textDecoration: "none"
        },
        navbarUserName:{
            // paddingLeft:"10px",
            paddingRight: "1rem"
        }
    })
);
