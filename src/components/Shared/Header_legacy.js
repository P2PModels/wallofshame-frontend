import React, { useState, useEffect } from 'react'
import {
    AppBar,
    Toolbar,
    Box,
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
import LogoutButton from '../Login/LogoutButton'
import AccountModule from '../AccountModule/AccountModule'
import useAuth from '../../providers/Auth/use'

const logoSrc = './assets/smart-logo.png'

const headerMenuLinks = [
    {
        label: 'Datos',
        href: '/',
    },
    {
        label: 'Sello Calidad ',
        href: '/badges',
    },
    // {
    //     label: 'Emitir sello',
    //     href: '/issue-badge',
    // },
]

const useStyles = makeStyles(theme => ({
    header: {
        border: 'none',
        '@media (max-width: 900px)': {
            paddingLeft: 0,
        },
    },
    logo: {
        position: 'realtive',
        width: '150px',
        height: theme.mixins.toolbar.minHeight,
        top: 0,
        '& img': {
            height: '150px',
            position: 'absolute',
            top: 0,
        },
    },
    menuButton: {
        marginLeft: '38px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    drawerContainer: {
        padding: '20px 30px',
    },
}))

export default function Header() {
    const { header, logo, menuButton, toolbar, drawerContainer } = useStyles()

    const { user } = useAuth()

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
            <Container>
                <Toolbar className={toolbar} disableGutters>
                    {customLogo}
                    <div>{getMenuButtons()} </div>
                    {/* <AccountModule /> */}
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
                    <div className={drawerContainer}>{getDrawerChoices()}</div>
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
        <Box className={logo}>
            <img src={logoSrc} />
        </Box>
    )

    const getMenuButtons = () => {
        const mainMenu = headerMenuLinks.map(({ label, href }, i) => {
            return (
                <Controls.Button
                    {...{
                        key: i,
                        text: label,
                        to: href,
                        component: RouterLink,
                        className: menuButton,
                    }}
                >
                    {label}
                </Controls.Button>
            )
        })
        // console.log('Header, user')
        // console.log(user)
        if (!!user) {
            mainMenu.push(
                <LogoutButton
                    {...{
                        key: 'logout',
                        className: menuButton,
                    }}
                ></LogoutButton>
            )
        }
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
