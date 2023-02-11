import React, { useState, useContext, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStyles } from './style';
import AuthContext from "../../store/auth-context"
import AdminServer from '../../serverAPI/admin';

const Navbar = () => {
    const classes = useStyles()
    const authCtx = useContext(AuthContext)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [isLogout, setIsLogout] = useState(authCtx.isLogout)
    const [admin, setAdmin] = useState(false)

    const menu = [
        {
            path: "/",
            text: "דף הבית"
        },
        {
            path: "/mycourses",
            text: "הקורסים שלי"
        },
        {
            path: "/profile",
            text: "פרופיל"
        }
    ]

    const menuAdmin = [
        {
            path: "/",
            text: "דף הבית"
        },
        {
            path: "/profile",
            text: "פרופיל"
        },
        {
            path: "/admin",
            text: "מנהלן"
        }
    ]

    useEffect(() => {
        const getData = async () => {
            if (authCtx.userId) {
                const admin = await AdminServer.getAdmin(authCtx.userId)
                setAdmin(admin.length > 0)
            }
        }

        getData()
    }, [authCtx.userId])

    const logOut = () => {
        setIsLogout(true);
        authCtx.isLogout = true;
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpenDrawer(open)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {authCtx.isLogout === false && <Avatar src={authCtx.photoUrl}></Avatar>}
                    {(isLogout === false) ?
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {authCtx.userName}
                        </Typography> :
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                    }
                    <Link className={classes.authButton} to="/auth">
                        {(isLogout === false) ?
                            <Button color="inherit" onClick={logOut}>Logout</Button>
                            :
                            <Button color="inherit">Login</Button>}
                    </Link >
                </Toolbar >
            </AppBar >
            <React.Fragment>
                <Drawer
                    anchor="left"
                    open={openDrawer}
                    onClose={toggleDrawer(false)}
                >
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            {admin ?
                                (menuAdmin.map((item, index) => (
                                    <Link className={classes.menu} to={item.path} key={index}>
                                        <ListItem key={item.text} disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={item.text} />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                ))) :
                                (menu.map((item, index) => (
                                    <Link className={classes.menu} to={item.path} key={index}>
                                        <ListItem key={item.text} disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={item.text} />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                )))
                            }
                        </List>
                    </Box>
                </Drawer>
            </React.Fragment>
        </Box >
    );
}

export default Navbar