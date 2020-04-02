/* Libraries */
import React, { useState, useLayoutEffect, useRef } from 'react';
import clx from 'classnames';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector as reduxUseSelector, useDispatch as reduxUseDispatch, TypedUseSelectorHook } from 'react-redux';
import { makeStyles, Theme, AppBar, Toolbar, IconButton, Icon, Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Menu, MenuItem } from '@material-ui/core';

/* Models */
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ReduxState } from 'client/model/Redux';

/* Application files */
import { signOut } from 'client/actions/user';
import LoadingOverlay from 'client/components/LoadingOverlay';

import DashboardPage from 'client/pages/DashboardPage';
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
        transform: 'translateX(0)',
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appbarShifted: {
        transform: `translateX(${drawerWidth}px)`,
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    toolbar: {
        justifyContent: 'space-between'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
        position: 'relative',
        marginTop: 64,
        height: '100%',
        transform: 'translateX(0)',
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    contentShifted: {
        transform: `translateX(${drawerWidth}px)`,
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    button: {
        color: '#ffffff'
    }
}));

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;
const useDispatch = () => reduxUseDispatch<ThunkDispatch<ReduxState, any, Action>>();

export function AdminPage () {
    const classes = useStyles();
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const leftMenuElement = useRef<HTMLElement>();
    const userMenuElement = useRef<HTMLDivElement>();
    const [ loading, setLoading ] = useState(false);
    const [ leftMenuOpen, setLeftMenuOpen ] = useState(false);
    const [ userMenuOpen, setUserMenuOpen ] = useState(false);

    useLayoutEffect(() => {
        const listener = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (leftMenuElement.current && leftMenuElement.current.contains(target)) return;

            setLeftMenuOpen(false);
        };

        document.addEventListener('click', listener);

        return () => {
            document.removeEventListener('click', listener);
        };
    });

    async function userSignOut () {
        setUserMenuOpen(false);
        setLoading(true);

        await dispatch(signOut());
    }

    function toggleLeftMenu () {
        setLeftMenuOpen(!leftMenuOpen);
    }

    function toggleUserMenu () {
        setUserMenuOpen(!userMenuOpen);
    }

    function goTo (path: string) {
        return () => {
            setLeftMenuOpen(false);
            history.push(path);
        };
    }

    if (loading) return <LoadingOverlay />

    return (
        <section className={classes.container}>
            <section ref={leftMenuElement}>
                <AppBar position="fixed" className={clx(classes.appBar, {
                    [classes.appbarShifted]: leftMenuOpen
                })}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton color="inherit" aria-label="Otwórz menu" onClick={toggleLeftMenu} edge="start">
                            <Icon>menu</Icon>
                        </IconButton>
                        <div ref={userMenuElement}>
                            <Button onClick={toggleUserMenu} startIcon={<Icon>account_circle</Icon>} className={classes.button}>{user.firstName} {user.lastName}</Button>
                            <Menu
                                open={userMenuOpen}
                                anchorEl={userMenuElement.current}
                                onClose={toggleUserMenu}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                >
                                <MenuItem onClick={userSignOut}>Wyloguj</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer variant="persistent" anchor="left" open={leftMenuOpen} className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
                    <List>
                        <ListItem button onClick={goTo('/admin')}>
                            <ListItemIcon><Icon>bar_chart</Icon></ListItemIcon>
                            <ListItemText primary="Statystyki" />
                        </ListItem>
                        <ListItem button onClick={goTo('/admin/devices')}>
                            <ListItemIcon><Icon>devices</Icon></ListItemIcon>
                            <ListItemText primary="Urządzenia" />
                        </ListItem>
                    </List>
                </Drawer>
            </section>
            <main className={clx(classes.content, { [classes.contentShifted]: leftMenuOpen })}>
                <Switch>
                    <Route path="/admin" exact={true} component={DashboardPage} />
                    <Route path="/admin/devices" exact={true} component={ListDevicesPage} />
                </Switch>
            </main>
        </section>
    );
}

export default AdminPage;
