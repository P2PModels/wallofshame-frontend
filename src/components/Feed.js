import React from 'react'
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Title from './Title'

import { FIRST_10_BADGES } from '../services/dbadge_backend/queries'

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    badge: {
        borderRadius: '5px',
        margin: '1rem',
        padding: '1rem',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        '& p, & h3': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
    },
}))

export default function Feed() {
    const classes = useStyles()
    const { loading, error, data } = useQuery(FIRST_10_BADGES)

    if (error) {
        // console.log(error)
        return (
            <React.Fragment>
                <Title>Error</Title>
                <p>{error.message}</p>
            </React.Fragment>
        )
    }
    if (loading || !data) {
        // console.log(loading)
        return (
            <React.Fragment>
                <Title>Cargando...</Title>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            <Title>Últimos certificados expedidos</Title>
            <Grid container justify={'flex-start'}>
                {data.badges.map(badge => {
                    return (
                        <Grid key={badge.id} item xs={12} md={6} lg={3}>
                            <Card className={classes.badge}>
                                <h3 title={badge.recipientName}>
                                    Sello de {badge.recipientName}
                                </h3>
                                <p>Expedido por: {badge.issuerName}</p>
                                <p>A nombre de: {badge.recipientName}</p>
                                <p>Identificador: {badge.id}</p>
                            </Card>
                        </Grid>
                    )
                })}
                {/* {data.allBadges.map(badge => {
                    return (
                        <Grid key={badge.id} item xs={12} md={6} lg={3}>
                            <Card className={classes.badge}>
                                <h3 title={badge.area}>
                                    Sello de {badge.area}
                                </h3>
                                <p>Expedido por: {badge.issuerName}</p>
                                <p>A nombre de: {badge.recipientName}</p>
                                <p>Con fecha: {badge.issueDate}</p>
                                <p>Area: {badge.area}</p>
                                <p>Identificador: {badge.id}</p>
                            </Card>
                        </Grid>
                    )
                })} */}
            </Grid>
        </React.Fragment>
    )
}
