import { grey } from '@mui/material/colors';
import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) =>
    createStyles({
        containerClass:{
            paddingTop:"2%",
        },
        card: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        },
        bannerItem:{
            display: "flex",
            flexDirection: "column",
        },
        iconClass:{
            paddingLeft:"2%",
            paddingRight:"2%"
        },
        bannerCard:{
            backgroundColor:"#999999",
            flexDirection: "column",
            justifyContent: "space-between"
        },
        centerCss:{
            display:"flex",
            justifyItems:"center",
            justifyContent:"center",
            textAlign:"center"
        },
        imageCourseDiv:{
            display:"flex",
            justifyItems:"center",
            justifyContent:"center",
            textAlign:"center",
            width: "100%",
            height:"12rem"
        },
        imageCourse:{
            // height: "100%",
            width: "100%",
            objectFit:"cover"
            // object-fit: "cover"
        }
    })
);
