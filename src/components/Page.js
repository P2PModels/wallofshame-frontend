import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline, Container } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar,
    main: {
        minHeight: `calc(100vh - 136px)`
    }
}))

export default function Page(props) {
    const classes = useStyles()
    const { children, className, container=true, maxWidth } = props
    
    return container ? 
        (
            <div>
                <CssBaseline />
                <main className={classes.main}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth={maxWidth || "lg"} className={className}>
                        {children}
                    </Container>
                </main>
            </div>
        )
    :
    (
        <div>
            <CssBaseline />
            <main className={classes.main}>
                <div className={classes.appBarSpacer} />
                {children}
            </main>
        </div>
    )
}
