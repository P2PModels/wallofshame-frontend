import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
}))


export default function DenseTable(props) {
  const { headers, dataset } = props
  const classes = useStyles()

  return (
    <TableContainer component="div">
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {headers.map((header,i) => {
                return (
                    <TableCell align='left' key={"cell-" + i}>{header}</TableCell>
                )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
            {dataset.map((set,i) => {
                return(
                    <TableRow
                        key={headers[i] + "-row-" + i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        {set.map((d, i) => <TableCell component="th" key={headers[i] + "-d" + i}>{d.slice(0,16) + "..."}</TableCell>)}

                    </TableRow>   
                )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}