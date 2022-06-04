import { React, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { parse } from 'papaparse'

const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: '600px',
        marginTop: theme.spacing(2),
        padding: theme.spacing(4),
        borderRadius: theme.spacing(1),
        border: "2px dashed #838383",
        color: '#838383',
        fontSize: '1rem',
    },
    highlight: {
        backgroundColor: '#d2f8d2'
    }

}))

export default function DropZone(props) {
    const classes = useStyles()
    const [over, setOver] = useState(false)
    const { className: styles, setDataEntries, setDataHeaders, ...other } = props

    return (
        <div 
            className={ styles ? over ? clsx(styles, classes.container, classes.highlight): clsx(styles, classes.container) : over ? clsx(classes.container, classes.highlight): classes.container }
            {...other}
            onDragEnter={e => {
                e.preventDefault()
                setOver(true)
            }}
            onDragLeave={e => {
                e.preventDefault()
                setOver(false)
            }}
            onDragOver={e => {
                e.preventDefault()
            }}
            onDrop={ e => {
                e.preventDefault()
                setOver(false)
                // Filter by type file, only allow text/csv
                Array.from(e.dataTransfer.files)
                    .filter(file => file.type === "text/csv")
                    .forEach( async (file) => {
                        const text = await file.text()
                        const data = parse(text).data
                        // console.log("[DropZone] Headers")
                        // console.log(data[0])
                        setDataHeaders(data[0])
                        // console.log("[DropZone] Dataset")
                        // console.log(data)
                        data.shift()
                        setDataEntries(data)

                    })
            }}
            >
            Arrastra un archivo csv con los casos que quieres cargar...
        </div>
    )
}
