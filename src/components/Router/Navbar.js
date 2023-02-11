import React, { useState,useContext,useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Avatar, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link,useNavigate } from 'react-router-dom';
import { useStyles } from './style';
import AuthContext from "../../store/auth-context"
import { FormatColorReset } from '@mui/icons-material';

const Navbar = () => {

 
    const classes = useStyles()
    const authCtx = useContext (AuthContext);
    const isLogout = authCtx.isLogout;
    const history = useNavigate();
    // const [isLogout  , setIsLogout] = useState(authCtx.isLogout ); 
    const [openDrawer, setOpenDrawer] = useState(false)
    const menu = [
        {
            path: "/",
            text: "דף הבית",
            isNeedSignIn:false
        },
        {
            path: "/mycourses",
            text: "הקורסים שלי",
            isNeedSignIn:true
        },
        {
            path: "/profile",
            text: "פרופיל",
            isNeedSignIn:true
        },
        {
            path: "/admin",
            text: "מנהלן",
            isNeedSignIn:true
        }
    ]
    useEffect(()=>{
        // setIsLogout(authCtx.isLogout )
    })
    const logoutAction = () =>{
        console.log("Yay")
        authCtx.isLogout = true;
        authCtx.logout();
        history('/');
    }
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpenDrawer(open)
    };
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
                    {/* <Typography variant="h6" component="div" >
                        קורסים אונליין
                    </Typography> */}
                    {authCtx.isLogout === false && <Avatar src={authCtx.photoUrl}></Avatar> }
                    {(isLogout === false)? <Typography className={classes.navbarUserName} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                         {authCtx.userName}
                    </Typography>:<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography> }
                    {(isLogout === true) &&
                    <Link className={classes.authButton} to="/auth">
                        
                            <Button color="inherit" >Login</Button>
                    </Link>
                }
                    {(isLogout === false)&&
                            <Button color="inherit" onClick={logoutAction}>Logout</Button>}
                </Toolbar>
            </AppBar>
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
                            {menu.map((item, index) => (
                                (item.isNeedSignIn == false || (item.isNeedSignIn && isLogout == false ) )&&
                                <Link className={classes.menu} to={item.path} key={index}>
                                    <ListItem key={item.text} disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={item.text} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </React.Fragment>
        </Box>
    );
}

export default Navbar