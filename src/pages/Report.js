import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Grid } from '@material-ui/core'
import Page from '../components/Page'
import ReportCaseForm from '../components/ReportCaseForm'
// import MetamaskButton from '../../components/MetamaskButton'

const useStyles = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar,
    title: {
        color: theme.palette.primary.main,
        fontSize: '4rem',
        fontWeight: '700',
        padding: '4rem 0 2rem',
    },
    caption: {
        fontSize: '1.25rem',
    },
    flexItemEnd: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
}))

export default function IssueBadge() {
    const classes = useStyles()

    return (
        <Page container={false}>
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item lg={9}>
                        <Typography variant="h2" className={classes.title}>
                            Informa sobre tu caso
                        </Typography>
                        <Typography variant="body1" className={classes.caption}>
                            La información es poder. Si has sufrido algún tipo
                            de abuso por parte de pagadores privados,
                            administración o algún otro tipo de entidad pública
                            o privada, déjanos un testimonio anónimo para ayudar
                            a otros/as compañeros/as de profesión.
                        </Typography>
                        <ReportCaseForm />
                    </Grid>
                </Grid>
            </Container>
        </Page>

        //                 {/* <Grid item xs={3} className={classes.flexItemEnd}>
        //                     <MetamaskButton />
        //                 </Grid> */}
    )
}
