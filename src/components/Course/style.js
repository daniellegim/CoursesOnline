import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) =>
    createStyles({
        card: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        }
    })
);
