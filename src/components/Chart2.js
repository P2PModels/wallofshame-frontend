import React from 'react'
import { useTheme } from '@material-ui/core'
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    Bar,
} from 'recharts'
import Title from './Title'

const data = [
    { name: 'a', pv: 1, uv: 2 },
    { name: 'b', pv: 15, uv: 10 },
    { name: 'c', pv: 23, uv: 4 },
    { name: 'd', pv: 12, uv: 16 },
    { name: 'e', pv: 3, uv: 8 },
    { name: 'f', pv: 5, uv: 0 },
]

const Chart2 = () => {
    const theme = useTheme()
    return (
        <React.Fragment>
            <Title>Male/Female</Title>
            <ResponsiveContainer>
                <BarChart data={data}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" stroke={theme.palette.text.main} />
                    <YAxis stroke={theme.palette.text.main} />
                    {/* <Tooltip /> */}
                    <Legend
                        style={{
                            textAnchor: 'middle',
                            fill: theme.palette.text.dark,
                        }}
                    />
                    <Bar dataKey="pv" fill={theme.palette.primary.main} />
                    <Bar dataKey="uv" fill={theme.palette.primary.light} />
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    )
}

export default Chart2
