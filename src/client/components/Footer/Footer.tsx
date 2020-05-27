/* Libraries */
import React from 'react';
import clx from 'classnames';
import { makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

type Props = {
    className?: string;
};

const useStyles = makeStyles({
    wrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        fontSize: 11,
        padding: '0 12px'
    }
});

export function Footer (props: Props) {
    const classes = useStyles();

    return (
        <footer className={clx(classes.wrapper, { [props.className]: !!props.className })}>
            <Typography variant="caption">#dajzekompa 2020</Typography>
            <nav className={classes.menu}>
                <ul className={classes.menu}>
                    <li className={classes.menuItem}><a target="_blank" href="https://github.com/szopenkrk/dajzekompa">Github Repo projektu</a></li>
                    <li className={classes.menuItem}><Link to="/polityka-prywatnosci">Polityka Prywatności</Link></li>
                    <li className={classes.menuItem}><Link to="/regulamin">Regulamin</Link></li>
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;
