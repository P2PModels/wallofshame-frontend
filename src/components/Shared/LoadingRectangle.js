
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from '@mui/material/Skeleton';
import {   Grid, useTheme } from '@material-ui/core'


    
export default function LoadingRectangle({children}) {
    return (
        <div >
            <Skeleton variant='rectangular' >{children}</Skeleton>
        </div>
    )
}



