import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Chip, Paper, Grid, Typography, useTheme } from '@material-ui/core'
import Title from './Title'
import VerticalBarChart from './VerticalBarChart'
import PieChart from './PieChart'
import Skeleton from '@mui/material/Skeleton';
import LoadingText from './Shared/LoadingText';
import LoadingRectangle from './Shared/LoadingRectangle';
import { Pie } from 'recharts';
import { steps } from "../components/Steps";
import Joyride from "react-joyride";

import { useAppState } from '../providers/AppStateProvider/use'
import {
    categories,
    regionToId,
    regionToRegionRenderName,
    typeToTypeRenderName,
    professionToProfessionRenderName,
    genderToGenderRenderName,
    ageRangeToAgeRangeRenderName,
    chipColors,
} from '../data/config.json'
import { useQuery } from '@apollo/client'
import { GET_STAT } from '../services/cases/queries'
import { toPercentages } from '../helpers/general-helpers'

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
        fontSize: '1.75rem',
    },
    typeOfReport: {
        display: 'flex',
        alignItems: 'center',
    },
    dInlineBlock: {
        display: 'inline-block',
    },
    chip: {
        margin: '0 0 0 2rem',
        fontSize: '1rem',
        borderRadius: '5px',
    },
    fixedHeightItem: {
        height: '25rem',
    },
    chartTitle: {
        fontSize: '2.25rem',
        fontWeight: '300',
        lineHeight: '3rem',
    },
    chartContainer: {
        height: '100%',
        backgroundColor: 'rgba(238,238,238,0.4)',
        border: '1px solid #DFDFDF',
        padding: '1rem',
    },
    
}))

export default function Dashboard() {
    const theme = useTheme()
    const classes = useStyles()
    const { region } = useAppState()

    const { data, loading, error } = useQuery(GET_STAT, {
        variables: {
            regionId: regionToId[region],
        },
    })



    if (error) return <Typography>{error.message}</Typography>

    const stat = data ? data.stat : {}
    return (
        <>
        {loading ? (
            <Grid
            container
            className={classes.dashboardContainer}
            justify="flex-start"
            alignItems="center"
            >
                {/* loading for title */}
                <LoadingText>
                    <Grid item xs={12}>
                        <Title
                            component="h2"
                            variant="h1"
                            className={classes.regionTitle}
                        >
                            {regionToRegionRenderName[region]}
                        </Title>
                        <Typography className={classes.totlaNumberOfReports}>
                        casos han denunciado abusos de empresas
                        o entidades públicas en la zona.
                    </Typography>
                    </Grid>
                </LoadingText>

                {/* loading for type of abuse */}
                <Skeleton variant='text' height={200} width={2000}></Skeleton>

                {/* loading for graph 1 */}
                
                <Grid
                    item
                    xs={12}
                    md={10}
                    lg={8}
                    xl={6}
                    className={classes.fixedHeightItem}
                >
                    <Skeleton variant='rectangular' height={300} width={800} ></Skeleton>
                </Grid>

                
                {/* loading for graph 2 */}
                
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className={classes.fixedHeightItem}
                >
                    <Skeleton variant='rectangular' height={300} width={"100%"} ></Skeleton>

                </Grid>
                
                {/* loading for graph 3 */}
                
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className={classes.fixedHeightItem}
                >
                    <Skeleton variant='rectangular' height={300} width={500} ></Skeleton>

                </Grid>

                
   
               
            </Grid>






        ) : (
           
            <Grid
                container
                className={classes.dashboardContainer}
                spacing={4}
                justify="flex-start"
                alignItems="center"
            >
                <div className = 'dashboard'>
                    <Grid item xs={12}>
                        <Title
                            component="h2"
                            variant="h1"
                            className={classes.regionTitle}
                        >
                            {regionToRegionRenderName[region]}
                        </Title>
                        <Typography className={classes.totlaNumberOfReports}>
                            {stat.casesByRegion} casos han denunciado abusos de empresas
                            o entidades públicas en la zona.
                        </Typography>
                    </Grid>
                    
                </div>    
                    
                    <Grid item xs={12} className={classes.typeOfReport}>
                        <Title
                            component="h2"
                            variant="h2"
                            className={clsx(classes.dInlineBlock, classes.chartTitle)}
                        >
                            TIPO DE ABUSO
                        </Title>
                        {categories.types.map((key, i) => {
                            return (
                                <Chip
                                    label={
                                        typeToTypeRenderName[key] +
                                        ' ' +
                                        // Get the stats based in the position in the array
                                        stat.casesByType[categories.types.indexOf(key)]
                                    }
                                    className={classes.chip}
                                    style={{
                                        backgroundColor: chipColors[key],
                                        color: theme.palette.text.light,
                                    }}
                                    key={key + 'chip'}
                                />
                            )
                        })}
                    </Grid>
                

                {/* Profession chart */}
                <Grid
                    item
                    xs={12}
                    md={10}
                    lg={8}
                    xl={6}
                    className={classes.fixedHeightItem}
                >
                    <Title
                        component="h2"
                        variant="h2"
                        className={classes.chartTitle}
                    >
                        PROFESIÓN
                    </Title>
                    <Box className={classes.chartContainer}>
                        <VerticalBarChart
                            keys={categories.professions}
                            values={toPercentages(stat.casesByProfession)}
                            labels={professionToProfessionRenderName}
                        />
                    </Box>
                </Grid>
                {/* Gender chart */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className={classes.fixedHeightItem}
                >
                    <Title
                        component="h2"
                        variant="h2"
                        className={classes.chartTitle}
                    >
                        GÉNERO
                    </Title>
                    <Box className={classes.chartContainer}>
                        <PieChart
                            keys={categories.genders}
                            values={toPercentages(stat.casesByGender)}
                            labels={genderToGenderRenderName}
                        />
                    </Box>
                </Grid>
                {/* Age range chart */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className={classes.fixedHeightItem}
                >
                    <Title
                        component="h2"
                        variant="h2"
                        className={classes.chartTitle}
                    >
                        EDAD
                    </Title>
                    <Box className={classes.chartContainer}>
                        <PieChart
                            keys={categories.ageRanges}
                            values={toPercentages(stat.casesByAgeRange)}
                            labels={ageRangeToAgeRangeRenderName}
                        />
                    </Box>
                </Grid>
            </Grid>
        )}
        </>
    )
}
