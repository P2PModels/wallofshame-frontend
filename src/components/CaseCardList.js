import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Grid } from '@mui/material'
import CaseCard from './CaseCard'
import ModalTitle from './Shared/ModalTitle'

const useStyles = makeStyles(theme => ({
    container: {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        height: 'calc(100% - 2rem)',
        width: '33%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        padding: '0rem 2rem 2rem',
        zIndex: 400,
        overflowY: 'scroll !important',
        
    },
}))

export default function CaseCardList(props) {
    const classes = useStyles()
    const { title, cases, open, onClose } = props

    if (!open) return <></>

    return (
        <Card className={classes.container}>
            <ModalTitle onClose={onClose}>{title}</ModalTitle>
            
            {cases.map((c,i) => {
                
                if(c.region != "" && c.description != ""){                
                    return <CaseCard caseDetails={c} expandedProp={true} key={`casecard-${c.id}`} />
            }})}
        </Card>
    )
}
