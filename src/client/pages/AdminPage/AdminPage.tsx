/* Libraries */
import React, { useState, useLayoutEffect, useRef } from 'react';
import clx from 'classnames';
import { Switch, Route, Link } from 'react-router-dom';
import { makeStyles, Theme, AppBar, Toolbar, IconButton, Icon, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

/* Application files */
import ListDevicesPage from 'client/pages/ListDevicesPage';

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    },
    appBar: {
        transition: theme.transitions.create(['left'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appbarShifted: {
        left: drawerWidth,
        transition: theme.transitions.create(['left'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        position: 'relative',
        marginTop: 64,
        height: '100%',
        transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    contentShift: {
        transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        left: drawerWidth
    },
}));

export function AdminPage () {
    const classes = useStyles();
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

    function toggleMenu (e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();

        setOpen(!open);
    }

    return (
        <section className={classes.container}>
            <section ref={navElement}>
                <AppBar position="fixed" className={clx(classes.appBar, {
                    [classes.appbarShifted]: open
                })}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Otwórz menu" onClick={toggleMenu} edge="start">
                            <Icon>menu</Icon>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="persistent" anchor="left" open={open} className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
                    <List>
                        <Link to="/admin/devices">
                            <ListItem button>
                                <ListItemIcon><Icon>devices</Icon></ListItemIcon>
                                <ListItemText primary="Urządzenia" />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </section>
            <main className={clx(classes.content, { [classes.contentShift]: false })}>
                <Switch>
                    <Route path="/admin/devices" component={ListDevicesPage} />
                </Switch>
            </main>
        </section>
    );
}

export default AdminPage;
