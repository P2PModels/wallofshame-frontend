
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from '@mui/material/Skeleton';
import {   Grid, useTheme } from '@material-ui/core'

/* const useStyles = makeStyles(theme => ({
    avatarSkeletonContainer: {
        height: 0,
        overflow: "hidden",
        paddingTop: "100%",
        position: "relative"
      },
      avatarLoader: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      },
})); */
    
export default function LoadingRectangle({children}) {
    return (
/*         <div>
            <Skeleton height={300} width={3000}>{children}</Skeleton> 
            <Skeleton variant='circular' >{children}</Skeleton>
        </div> */
        <div >
            <Skeleton variant='rectangular' >{children}</Skeleton>
        </div>
    )
}



