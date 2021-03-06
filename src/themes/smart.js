import { createMuiTheme } from '@material-ui/core/styles'
import { red, green, grey, white, greenBlue } from './colors'

const theme = createMuiTheme({
    palette: {
        primary: {
            dark: red[900],
            main: red[500],
            light: red[100],
        },
        secondary: {
            main: grey[900],
        },
        text: {
            dark: grey[900],
            main: grey[500],
            light: white[0],
            secondary: grey[400],
        },
        error: {
            dark: red[900],
            main: red[500],
            light: red[100],
        },
        success: {
            main: green[500],
        },
    },
    typography: {
        fontsize: '16px',
        h1: {
            fontSize: '1.5rem',
            fontWeight: '800',
        },
        h2: {
            fontSize: '1.4rem',
            fontWeight: '500',
        },
        h3: {
            fontSize: '1.25rem',
            fontWeight: '400',
        },
        h4: {
            fontSize: '1rem',
            fontWeight: '400',
        },
        h5: {
            fontSize: '1rem',
            fontWeight: '400',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: '400',
        },
    },
    spacing: 16,
    mixins: {
        toolbar: {
            minHeight: '116px',
        },
    },
})

export default theme
