/* Libraries */
import React from 'react';
import clx from 'classnames';
import { makeStyles } from '@material-ui/core';

/* Application files */
import logo from '../../assets/images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '940px'
    },
    navigation: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '13px 0'
    },
    menu: {
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0
    },
    menuItem: {
        textTransform: 'uppercase',
        fontFamily: 'Roboto',
        fontSize: '15px',
        fontWeight: 500,
        margin: '12px',
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
            width: '12px',
            height: '12px',
            borderRadius: '6px',
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            top: '-6px'
        }
    }
}));

const menu = [
    { label: 'O akcji', route: '/o-akcji' },
    { label: 'FAQ', route: '/faq' },
    { label: 'Podaruj kompa', route: '/podaruj-kompa' },
    { label: 'Zgłoś potrzebę', route: '/zglos-potrzebe' },
    { label: 'Regulamin', route: '/regulamin' },
    { label: 'Zgłoś miasto', route: '/zglos-miasto' },
];

export function MainMenu () {
    const classes = useStyles();
    const location = useLocation();

    return (
        <nav className={clx(classes.container, classes.navigation)}>
            <Link to="/"><img src={logo} /></Link>
            <ul className={classes.menu}>
                {menu.map((item, index) => (
                    <li key={index} className={clx(classes.menuItem, { [classes.menuItemActive]: item.route === location.pathname})}>
                        <Link to={item.route}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default MainMenu;
