import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid } from '@material-ui/core'
import Page from '../components/Page'
import ReportCaseForm from '../components/ReportCaseForm'
// import MetamaskButton from '../../components/MetamaskButton'

// const useStyles = makeStyles(theme => ({
//     flexItemEnd: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//         alignItems: 'flex-start',
//     }
// }))

export default function Report() {
    // const classes = useStyles()

    return (
        <Page container={false}>
            <Container maxWidth="xl">
                <Grid container>    
                    <ReportCaseForm />
                </Grid>
            </Container>
        </Page>

        // {<Grid item xs={3} className={classes.flexItemEnd}>
        //     <MetamaskButton />
        // </Grid> }
    )
}
