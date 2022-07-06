/*
    Styles for Food Diary Page
*/

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    warpper: {
        p: 2,
        minWidth: 600
    },
    grid: {
        minHeight: "100vh",
    },
    heading: {
        fontFamily: "monospace !important",
        fontWeight: "700 !important",
        letterSpacing: ".2rem !important",
        textDecoration: "none",
    },
    link: { 
        textDecoration: "none", 
        color: "white"
    }

})

export default useStyles;