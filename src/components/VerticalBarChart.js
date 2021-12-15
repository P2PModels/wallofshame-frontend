import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Bar, XAxis, YAxis, ResponsiveContainer, BarChart } from 'recharts';
import { useTheme } from "@material-ui/styles";
import { Box, Grid, Typography } from '@material-ui/core';

const data = [
  {
    name: 'Artes escénicas',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Diseño y Arquitectura',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Fotografía',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Artes plásticas',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Traducción',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Gestión cultural',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  }
];


const useStyles = makeStyles(theme => ({
  chartContainer: {
      height: '100%',
  },
  ticksContainer: {
    '& :first-child': {
      marginTop: '27px'
    },
    '& :last-child': {
      marginBottom: 0
    }
  },
  tick: {
    display: 'block',
    margin: '0 0 26px',
    lineHeight: '20px',
  },

}))



export default function VerticalBarChart(props) {
    const theme = useTheme()
    const classes = useStyles()
    const { ...other } = props

    return (
      
      <Grid container className={classes.chartContainer} justify='center'>
        <Grid item xs={6}>
          <ResponsiveContainer width="100%" height="100%" {...other}>
            <BarChart
              layout='vertical'
              data={data}
              margin={{
                top: 10,
                right: 60, // Sapce left at the right so the text of the label in the bars doesnt get cut
                left: 10,
                bottom: 10,
              }}
              barGap={2}
              >
              <XAxis type="number" hide/>
              <YAxis dataKey="name" type="category" hide/>
              <Bar dataKey="pv" barSize={20} fill={theme.palette.primary.main} background={{ fill: '#E4E4E4' }} label={{ fill: theme.palette.primary.main, fontSize: 16, position: 'right'}}/>
            </BarChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item className={classes.ticksContainer}>
          {data.map((d)=>{
            return (
              <Typography component='span' className={classes.tick} key={d.name + '-tick'}>{d.name}</Typography>
            )
          })}
        </Grid>
      
      </Grid>
    );
  
}
