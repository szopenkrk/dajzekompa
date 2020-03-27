/* Libraries */
import React, { useState, MouseEvent } from 'react';
import clx from 'classnames';
import { Switch, Route, Link } from 'react-router-dom';
import { makeStyles, AppBar, Toolbar, Icon, IconButton, Drawer, Theme, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

/* Application files */
import ListDevicesPage from '../ListDevicesPage';
import ListReceiversPage from '../ListReceiversPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
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
        marginTop: '64px',
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
    const [ open, setOpen ] = useState(false);

    function toggleMenu (e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();

        setOpen(!open);
    }

    return (
        <section className={classes.container}>
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
                    <Link to="devices">
                        <ListItem button>
                            <ListItemIcon><Icon>devices</Icon></ListItemIcon>
                            <ListItemText primary="Urządzenia" />
                        </ListItem>
                    </Link>
                    <Link to="receivers">
                        <ListItem button>
                            <ListItemIcon><Icon>people</Icon></ListItemIcon>
                            <ListItemText primary="Odbiorcy" />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            <main className={clx(classes.content, { [classes.contentShift]: open })}>
                <Switch>
                    <Route path="/admin/devices" component={ListDevicesPage} />
                    <Route path="/admin/receivers" component={ListReceiversPage} />
                </Switch>
            </main>
        </section>
    );
}

export default AdminPage;
