import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Chip, Grid, Typography } from '@material-ui/core'
import Chart from '../components/Chart'
import Title from './Title'
import mockDashboardQuery from '../data/mockDashboardQuery.json'

const useStyles = makeStyles(theme => ({
    chart: {
        height: 350,
    },
    fullHeight: {
        height: '100%',
    },
}))

export default function Dashboard() {
    const classes = useStyles()

    return (
            <Grid container spacing={3} justify={'center'}>
                <Grid item xs={12}>
                    <Title component="h1" variant="h1">{mockDashboardQuery.regionName}</Title>
                    <Typography>{mockDashboardQuery.reportsByRegion} casos han denunciado abusos de empresas o entidades públicas en la zona.</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Title component="h2" variant="h2">Tipo de abuso</Title>
                    {
                        Object.keys(mockDashboardQuery.reportsByType).map((key)=>{
                            return (
                                <Chip 
                                    label={key + ' '+ mockDashboardQuery.reportsByType[key]}
                                    key={'casos-' + key}
                                />
                            )
                        })
                    }
                </Grid>
                {/* Chart */}
                <Grid item xs={12} md={12} lg={8} className={classes.chart}>
                    <Chart />
                </Grid>
            </Grid>
    )
}
