import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Chip, Grid, Typography } from '@material-ui/core'
import Title from './Title'
import mockDashboardQuery from '../data/mockDashboardQuery.json'
import VerticalBarChart from './VerticalBarChart'
import PieChart from './PieChart'


const useStyles = makeStyles(theme => ({
    dashboardContainer: {
        marginTop: '4rem',
        marginBottom: '4rem',
    },
    regionTitle: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
    },
    totlaNumberOfReports: {
        fontSize: '1.75rem'
    },
    typeOfReport: {
        display: 'flex',
        alignItems: 'center'
    },
    dInlineBlock: {
        display: 'inline-block'
    },
    chip: {
        margin: '0 0 0 2rem',
        fontSize: '1rem',
        borderRadius: '5px'
    },
    fixedHeightItem: {
        height: '25rem'
    },
    chartTitle: {
        fontSize: '2.25rem',
        fontWeight: '300',
        lineHeight: '3rem'
    },
    chartContainer: {
        height: '100%',
        backgroundColor: "rgba(238,238,238,0.4)",
        border: "1px solid #DFDFDF",
        padding: '1rem',
    },
}))

export default function Dashboard() {
    const classes = useStyles()

    return (
        <Grid container className={classes.dashboardContainer} spacing={4} justify='flex-start' alignItems='center'>
            <Grid item xs={12}>
                <Title component="h2" variant="h1" className={classes.regionTitle}>{mockDashboardQuery.regionName}</Title>
                <Typography className={classes.totlaNumberOfReports}>{mockDashboardQuery.reportsByRegion} casos han denunciado abusos de empresas o entidades públicas en la zona.</Typography>
            </Grid>
            <Grid item xs={12} className={classes.typeOfReport}>
                <Title component="h2" variant="h2" className={clsx(classes.dInlineBlock,classes.chartTitle)}>TIPO DE ABUSO</Title>
                {
                    Object.keys(mockDashboardQuery.reportsByType).map((key)=>{
                        return (
                            <Chip 
                                label={key + ' '+ mockDashboardQuery.reportsByType[key]}
                                className={classes.chip}
                                color='primary'
                                key={'casos-' + key}
                            />
                        )
                    })
                }
            </Grid>
            {/* Profession chart */}
            <Grid item xs={12} md={10} lg={8} xl={6} className={classes.fixedHeightItem}>
                <Title component="h2" variant="h2" className={classes.chartTitle}>PROFESIÓN</Title>
                <Box className={classes.chartContainer}>
                    <VerticalBarChart />
                </Box>
            </Grid>
            {/* Gender chart */}
            <Grid item xs={12} md={6} lg={4} xl={3} className={classes.fixedHeightItem}>
                <Title component="h2" variant="h2" className={classes.chartTitle}>GÉNERO</Title>
                <Box className={classes.chartContainer}>
                    <PieChart/>
                </Box>
            </Grid>
            {/* Age range chart */}
            <Grid item xs={12} md={6} lg={4} xl={3} className={classes.fixedHeightItem}>
                <Title component="h2" variant="h2" className={classes.chartTitle}>EDAD</Title>
                <Box className={classes.chartContainer}>
                    <PieChart/>
                </Box>
            </Grid>
        </Grid>
    )
}
