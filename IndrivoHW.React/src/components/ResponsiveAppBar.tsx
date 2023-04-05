import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import UserDto from '../entities/UserDto';
import { getUser } from '../services/UserService';

function ResponsiveAppBar(props: any) {


    const [isAuth, setAuth] = useState(false);
    const [isAdmin, setAdmin] = useState(false);

    const currentUser = localStorage.getItem("user");
    const tet = async () => {
        const apiUserId: UserDto = await getUser(currentUser!)
        return apiUserId;
    }


    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setAuth(true);
            tet().then((value: UserDto) => {
                const currentUserRole: string = value.role;
                if (currentUserRole === "Admin") {
                    setAdmin(true);
                }
            });
        }
    }, []);


    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleAdminPage = () => {
        window.location.href = "http://localhost:3000/adminPage"
    }

    const handleLoginHistory = () => {
        window.location.href = "http://localhost:3000/loginHistory"
    }

    const handleLogout = () => {
        if (isAuth) {
            localStorage.clear();
            setAuth(false);
            window.location.href = "http://localhost:3000/auth"
        }
    };

    const handleLogin = () => {
        if (!isAuth) {
            window.location.href = "http://localhost:3000/auth"
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        IndrivoHW
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >

                        </IconButton>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        IndrivoHW
                    </Typography>

                    <Box sx={{ flexGrow: 0 }} >
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {isAuth ?
                                    <Avatar>{Array.from(localStorage.getItem("user")![0])}</Avatar>
                                    : <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} />
                                }
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {isAuth ?
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Log out</Typography>
                                </MenuItem>
                                : <MenuItem onClick={handleLogin}>
                                    <Typography textAlign="center">Log in</Typography>
                                </MenuItem>
                            }
                            {isAdmin ?
                                <>
                                    <MenuItem onClick={handleAdminPage}>
                                        <Typography textAlign="center">Users List</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLoginHistory}>
                                        <Typography textAlign="center">Login History</Typography>
                                    </MenuItem>
                                </>
                                : null

                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )

}
export default ResponsiveAppBar