import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface Theme {
        typography: {
            fontFamily: 'Jost',
        },
    }
    interface ThemeOptions {
       
    }
}

export const theme = createTheme({
    typography: {
        fontFamily: 'Jost',
    },
});