/* Libraries */
import React, { useState, useRef, useLayoutEffect } from 'react';
import clx from 'classnames';
import { makeStyles, useMediaQuery, IconButton, useTheme } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

/* Application files */
import { useWindowSize } from 'client/lib/hooks';
import logo from 'client/assets/images/logo.svg';
import menuOpenButton from 'client/assets/images/icon-openmenu.svg';
import menuCloseButton from 'client/assets/images/icon-closemenu.svg';

function getMenuCircleOffset ({ width }: any) {
    return -(width - (width * Math.sqrt(3) / 2));
}

const useStyles = makeStyles((theme) => ({
    container: {
        width: 940,
        maxWidth: 'calc(100% - 20px)'
    },
    navigation: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '13px 0',
        [theme.breakpoints.down('sm')]: {
            alignItems: 'flex-start'
        }
    },
    menu: {
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
            flexDirection: 'column',
            position: 'fixed',
            zIndex: 100,
            color: '#ffffff',
            backgroundColor: theme.palette.primary.main,
            width: '100%',
            top: 0,
            left: 0,
            paddingTop: 80,
            '&::before': {
                content: '""',
                display: 'block',
                width: '200vw',
                height: '200vw',
                backgroundColor: theme.palette.primary.main,
                position: 'absolute',
                zIndex: -1,
                borderRadius: '50%',
                left: '-50vw',
                bottom: getMenuCircleOffset
            }
        }
    },
    menuOpen: {
        display: 'flex'
    },
    menuButton: {
        padding: 0,
        position: 'relative',
        zIndex: 110
    },
    menuItem: {
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 500,
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
    },
    menuItemActive: {
        color: theme.palette.primary.main,
        '&::before': {
            display: 'block',
            content: '""',
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            top: -6
        },
        [theme.breakpoints.down('sm')]: {
            color: 'inherit',
            '&::before': {
                display: 'none'
            }
        }
    }
}));

const menu = [
    { label: 'O akcji', route: '/o-akcji' },
    { label: 'FAQ', route: '/faq' },
    { label: 'Podaruj kompa', route: '/podaruj-kompa' },
    { label: 'Partnerzy', route: '/partnerzy' },
    { label: 'Regulamin', route: '/regulamin' },
];

export function MainMenu () {
    const { width, height } = useWindowSize();
    const theme = useTheme();
    const classes = useStyles({ width, height });
    const location = useLocation();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navElement = useRef<HTMLElement>();
    const [ open, setOpen ] = useState(false);

    useLayoutEffect(() => {
        const listener = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (navElement.current.contains(target)) return;

            setOpen(false);
        };

        document.addEventListener('click', listener);

        return () => {
            document.removeEventListener('click', listener);
        };
    });

    function toggleMenu () {
        setOpen(!open);
    }

    if (!mobile && open) {
        setOpen(false);
    }

    return (
        <nav className={clx(classes.container, classes.navigation)} ref={navElement}>
            <Link to="/"><img src={logo} /></Link>
            <ul className={clx(classes.menu, { [classes.menuOpen]: open })}>
                {menu.map((item, index) => (
                    <li key={index} className={clx(classes.menuItem, { [classes.menuItemActive]: item.route === location.pathname})}>
                        <Link to={item.route} onClick={toggleMenu}>{item.label}</Link>
                    </li>
                ))}
            </ul>
            {mobile && (
                <IconButton aria-label="Otwórz menu" className={classes.menuButton} onClick={toggleMenu}>
                    {open ? <img src={menuCloseButton} /> : <img src={menuOpenButton} />}
                </IconButton>
            )}
        </nav>
    );
}

export default MainMenu;
