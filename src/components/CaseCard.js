import React from 'react'
import { styled } from '@mui/material/styles'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
    Card,
    CardContent,
    Typography,
    Chip,
    IconButton,
    Collapse,
    CardActions,
} from '@material-ui/core'
import { typeToTypeRenderName, chipColors } from '../data/config.json'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ExpandMore = styled(props => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '1rem',
        borderRadius: '5px',
        backgroundColor: '#fff',
        marginBottom: '2rem',
    },
    cardTitle: {
        padding: '0.5rem 1rem',
    },
    name: {
        display: 'block',
    },
    chip: {
        fontSize: '0.9rem',
        borderRadius: '5px',
        marginBottom: '0.5rem',
    },
}))

export default function CaseCard(props) {
    const classes = useStyles()
    const theme = useTheme()
    const { caseDetails } = props
    const [expanded, setExpanded] = React.useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <Card className={classes.container}>
            <CardContent className={classes.cardTitle}>
                <Typography variant="h4" className={classes.name}>
                    Caso #{caseDetails.id}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Chip
                    label={caseDetails.companyName}
                    className={classes.chip}
                />
                <Chip
                    label={typeToTypeRenderName[caseDetails.caseType]}
                    className={classes.chip}
                    style={{
                        marginLeft: theme.spacing(1),
                        backgroundColor: chipColors[caseDetails.caseType],
                        color: theme.palette.text.light,
                    }}
                />
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{caseDetails.description}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}
