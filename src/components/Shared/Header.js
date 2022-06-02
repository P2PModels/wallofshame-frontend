import React, { useState, useEffect } from 'react'
import { steps } from "../Steps";
import Joyride from "react-joyride";

import {
    AppBar,
    Toolbar,
    Box,
    Button,
    makeStyles,
    IconButton,
    Drawer,
    Link,
    MenuItem,
    Container,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Link as RouterLink } from 'react-router-dom'
import Controls from './controls/Controls'
import Title from '../Title'

const logoSrc = './assets/ico-logo.svg'

const headerMenuLinks = [
    {
        label: '¿QUÉ ES ESTO?',
        href: '/info',
    },
    {
        label: 'INFORMA SOBRE TU CASO',
        href: '/report',
        cta: true,
    },
]

const useStyles = makeStyles(theme => ({
    header: {
        border: 'none',
        borderTop: `8px solid ${theme.palette.primary.main}`,
        borderBottom: `1px solid ${theme.palette.text.secondary}`,
        '@media (max-width: 900px)': {
            paddingLeft: 0,
        },
        padding: '1rem 0',
        minHeight: theme.mixins.toolbar.minHeight,
        backgroundColor: 'white'
    },
    logoAndTitleContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    logo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '150px',
        height: '75px',
        '& img': {
            height: '100%',
        },
    },
    logoButton: {
        '&:hover': {
            backgroundColor: 'transparent',
        }
    },
    titleAndDescription: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& h1': {
            color: theme.palette.primary.dark,
        },
        '& span': {
            display: 'inline-block',
            maxWidth: '400px',
            color: theme.palette.primary.main,
        },
    },
    menuButton: {
        background: 'transparent',
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        boxShadow: 'none',
        '&:hover': {
            textDecoration: 'underline',
            background: 'transparent',
            color: theme.palette.primary.main,
            boxShadow: 'none',
        },
        '&:first-child': {
            marginLeft: '2rem'
        }
    },
    callToAction: {
        marginLeft: '2rem',
        marginRight: '0.5rem', // To align, due to ::after element
        background: theme.palette.primary.main,
        color: theme.palette.text.light,
        borderRadius: 0,
        position: 'relative',
        top: 0,
        left: 0,
        boxShadow: 'none',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
            top: '0.5rem',
            left: '0.5rem',
            background: theme.palette.primary.main,
            boxShadow: 'none',
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '0.5rem',
            left: '0.5rem',
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: `3px solid ${theme.palette.primary.main}`,
            boxShadow: 'none',
            transition: 'all 0.3s ease',
        },
        '&:hover::after': {
            top: '0px',
            left: '0px',
        },
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: 'auto',
    },
    drawerContainer: {
        padding: '20px 30px',
    },
}))

export default function Header() {
    const {
        header,
        logoAndTitleContainer,
        logo,
        logoButton,
        titleAndDescription,
        menuButton,
        callToAction,
        toolbar,
        drawerContainer,
    } = useStyles()

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    })

    const { mobileView, drawerOpen } = state

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
                ? setState(prevState => ({ ...prevState, mobileView: true }))
                : setState(prevState => ({ ...prevState, mobileView: false }))
        }

        setResponsiveness()

        window.addEventListener('resize', () => setResponsiveness())

        return () => {
            window.removeEventListener('resize', () => setResponsiveness())
        }
    }, [])

    const displayDesktop = () => {
        return (
            <Container maxWidth="xl">
                <Toolbar className={toolbar} disableGutters>
                    <div className={logoAndTitleContainer}>
                        {customLogo}
                        {TitleAndDescription}
                    </div>
                    <div>{getMenuButtons()} </div>
                </Toolbar>
            </Container>
        )
    }

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState(prevState => ({ ...prevState, drawerOpen: true }))
        const handleDrawerClose = () =>
            setState(prevState => ({ ...prevState, drawerOpen: false }))

        return (
            <Toolbar>
                <IconButton
                    {...{
                        edge: 'start',
                        color: 'inherit',
                        'aria-label': 'menu',
                        'aria-haspopup': 'true',
                        onClick: handleDrawerOpen,
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Drawer
                    {...{
                        anchor: 'left',
                        open: drawerOpen,
                        onClose: handleDrawerClose,
                    }}
                >
                    <div className= {drawerContainer} >{getDrawerChoices()}</div>
                </Drawer>

                <div>{customLogo}</div>
            </Toolbar>
        )
    }

    const getDrawerChoices = () => {
        return headerMenuLinks.map(({ label, href }) => {
            return (
                <Link
                    {...{
                        component: RouterLink,
                        to: href,
                        color: 'inherit',
                        style: { textDecoration: 'none' },
                        key: label,
                        className: menuButton,
                    }}
                >
                    <MenuItem>{label}</MenuItem>
                </Link>
            )
        })
    }

    const customLogo = (
        <Button
            className={logoButton}
            {...{
                to: '/',
                component: RouterLink,
            }}
        >   
            <Box className={logo}>
                <img src={logoSrc} />
            </Box>
        </Button>
    )

    const TitleAndDescription = (
        <Box className={titleAndDescription}>
            <Title variant="h1">
                Observatorio de la Precariedad en el Sector Cultural
            </Title>
            <span>
                Contrainformación, autodefensa y apoyo mutuo laboral basados en
                experiencias reales y anónimas. ¡Envíanos la tuya!{' '}
            </span>
        </Box>
    )

    const getMenuButtons = () => {
        const mainMenu = headerMenuLinks.map(({ label, href, cta }, i) => {
            return (
                <Controls.Button
                    {...{
                        key: i,
                        text: label,
                        to: href,
                        component: RouterLink,
                        className: !!cta ? callToAction : menuButton,
                    }}
                >
                    {label}
                </Controls.Button>
            )
        })
        return mainMenu
    }

    return (
        <AppBar
            className={header}
            color="transparent"
            variant="outlined"
            position="absolute"
        >
            {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
    )
}
