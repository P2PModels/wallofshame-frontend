import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline, Container } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar,
}))

export default function Page(props) {
    const classes = useStyles()
    const { children, className } = props
    return (
        <div>
            <CssBaseline />
            <main>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={className}>
                    {children}
                </Container>
            </main>
        </div>
    )
}
