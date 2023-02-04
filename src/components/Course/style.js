import { grey } from '@mui/material/colors';
import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) =>
    createStyles({
        card: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        },
        bannerCard:{
            backgroundColor:grey,
            flexDirection: "column",
            justifyContent: "space-between"
        },
        centerCss:{
            display:"flex",
            justifyItems:"center",
            justifyContent:"center",
            textAlign:"center"
        }
    })
);
