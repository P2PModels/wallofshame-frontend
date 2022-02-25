import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Bar, XAxis, YAxis, ResponsiveContainer, BarChart , LabelList} from 'recharts'
import { useTheme } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'
import { createDataObjectFromArrays } from '../helpers/general-helpers'

const useStyles = makeStyles(theme => ({
    chartContainer: {
        height: '100%',
    },
    ticksContainer: {
        '& :first-child': {
            marginTop: '27px',
        },
        '& :last-child': {
            marginBottom: 0,
        },
    },
    tick: {
        display: 'block',
        margin: '0 0 26px',
        lineHeight: '20px',
    },
}))
 
const renderCustomizedLabel = (props, percent) => {
    const { x, y, width, value } = props;
  
    return (
        <g>
        <text x={x + 10 + width } y={y + 15} fill="red" position= "right" >
        {`${value}%`}
      </text>
      </g>
    );
  };


  export default function VerticalBarChart(props) {
    const theme = useTheme()
    const classes = useStyles()
    const { keys, values, labels, ...other } = props
    const data = createDataObjectFromArrays(keys, values, labels)
    return (
        <Grid container className={classes.chartContainer} justify="center">
            <Grid item xs={6}>
                <ResponsiveContainer width="100%" height="100%" {...other}>
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{
                            top: 10,
                            right: 60, // Sapce left at the right so the text of the label in the bars doesnt get cut
                            left: 10,
                            bottom: 10,
                        }}
                        barGap={2}
                        
                    >
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis dataKey="key" type="category" hide />
                        <Bar
                            dataKey="value"
                            barSize={20}
                            fill={theme.palette.primary.main}
                            background={{ fill: '#E4E4E4' }}
                            /* label={{
                                fill: theme.palette.primary.main,
                                fontSize: 16,
                                position: 'right',
                            }} */
                           
                        >
                            <LabelList dataKey="value" content={renderCustomizedLabel} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item className={classes.ticksContainer}>
                {data.map(d => {
                    return (
                        <Typography
                            component="span"
                            className={classes.tick}
                            key={d.key + '-tick'}
                        >
                            {d.name}
                        </Typography>
                    )
                })}
            </Grid>
        </Grid>
    )
}
