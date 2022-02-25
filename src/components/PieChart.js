import React from 'react'
import {
    PieChart as RechartPieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { createDataObjectFromArrays } from '../helpers/general-helpers'

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

const COLORS = [
    '#561314',
    '#F9A49C',
    '#FF5769',
    '#A21212',
    '#616472',
    '#D8D8D8',
]
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) + 5;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) + 5;
  
    return (
      <text x={x} y={y} fill={COLORS[index % COLORS.length]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };    
export default function PieChart(props) {
    const { keys, values, labels, ...other } = props
    const data = createDataObjectFromArrays(keys, values, labels)
    return (
        <ResponsiveContainer width="100%" {...other}>
            <RechartPieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    cx="33.3%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            
                        />
                    ))}
                </Pie>
                <Legend align="right" verticalAlign="middle" width="33.3%" />
            </RechartPieChart>
        </ResponsiveContainer>
    )
}
