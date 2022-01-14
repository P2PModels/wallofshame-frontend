import React from 'react'
import clsx from 'clsx'
import Link from '@material-ui/core/Link'
import { Box, Typography, makeStyles, Container } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'col',
    },
    footer: {
        margin: '1rem auto',
        backgroundColor: theme.palette.secondary.main,
    },
    footerContent: {
        justifyContent: 'space-between',
        height: '100px',
    },
    logos: {
        maxWidth: '480px',
        '& #smart': {
            position: 'relative',
            top: '-10%',
            height: '120%',
            padding: '0',
        },
        '& #p2pmod': {
            padding: '1.5rem',
        },
        '& img': {
            padding: '1rem',
            height: '100%',
            width: 'auto',
            marginRight: '1rem',
        },
    },
    info: {
        justifyContent: 'flex-end',
        color: theme.palette.text.light,
        textAlign: 'right',
        '& div': {
            padding: '1rem 0.5rem',
        },
        '& a': {
            color: theme.palette.text.light,
            textDecoration: 'underline',
        },
    },
    githubIcon: {
        marginRight: '0.5rem',
    },
}))

export default function Footer() {
    const {
        flexRow,
        flexCol,
        footer,
        footerContent,
        logos,
        info,
        githubIcon,
    } = useStyles()

    return (
        <div className={footer}>
            <Container maxWidth="xl" className={clsx(flexRow, footerContent)}>
                <div className={clsx(flexRow, logos)}>
                    <img id="smart" src="./assets/smart-logo.png" />
                    <img id="p2pmod" src="./assets/p2p-logo.svg" />
                    <img src="./assets/EU-logo.png" />
                    <img src="./assets/ERC_logo.png" />
                </div>
                <Box className={clsx(flexRow, info)}>
                    <Box className={flexCol}>
                        <i className={githubIcon}>
                            <img src="./assets/ico-github.svg" />
                        </i>
                        <span>
                            Follow us on{' '}
                            <Link
                                href="https://github.com/p2pmodels"
                                target="_blank"
                            >
                                Github
                            </Link>
                        </span>
                    </Box>
                    <Box className={flexCol}>
                        <span>Copyleft with credits</span>
                    </Box>
                    <Box className={flexCol}>
                        <span>
                            This site is licensed under a{' '}
                            <Link
                                href="https://creativecommons.org/licenses/by/4.0/"
                                target="_blank"
                            >
                                Creative Commons Attribution 4.0 International
                                License
                            </Link>
                            . <br />
                            The{' '}
                            <Link href="https://p2pmodels.eu" target="_blank">
                                P2P Models
                            </Link>{' '}
                            project has been funded by a European Research
                            Council Grant.
                        </span>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}
