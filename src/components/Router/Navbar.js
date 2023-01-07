import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStyles } from './style';

const Navbar = () => {
    const classes = useStyles()
    const [openDrawer, setOpenDrawer] = useState(false)
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Courses
                    </Typography>
                    <Button color="inherit">Login</Button>
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