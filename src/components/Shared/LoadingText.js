
import React from 'react'

import Skeleton from '@mui/material/Skeleton';


export default function LoadingText({children}) {
    return (
        <div>
            <Skeleton variant='text' >{children}</Skeleton>
        </div>
    )
}


