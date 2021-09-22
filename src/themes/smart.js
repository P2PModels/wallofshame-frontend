import { createMuiTheme } from '@material-ui/core/styles'
import { red, grey, greenBlue } from './colors'

const theme = createMuiTheme({
    palette: {
        primary: {
            dark: red[900],
            main: red[500],
            light: red[100],
        },
        secondary: {
            main: greenBlue[500],
        },

        text: {
            dark: grey[800],
            main: grey[400],
            light: grey[100],
        },
    },
    typography: {
        fontsize: '16px',
        h1: {
            fontSize: '2.5rem',
            fontWeight: '500',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: '500',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: '400',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: '400',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: '400',
        },
        h6: {
            fontSize: '1.1rem',
            fontWeight: '400',
        },
    },
    spacing: 16,
    mixins: {
        toolbar: {
            minHeight: '75px',
        }
    }
})

export default theme
