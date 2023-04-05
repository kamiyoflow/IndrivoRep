import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Register from './pages/Register';
import AdminPage from './pages/AdminPage';
import { Grid } from '@mui/material';
import ResetPassword from './pages/ResetPassword';

function App() {

    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setAuth(true);
        }
    }, []);


    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/auth' element={isAuth ? <Navigate to="/" /> : <Auth />} />
                    <Route path="/" element={<Home />} />
                    <Route path='/register' element={isAuth ? <Navigate to="/" /> : <Register />} />
                    <Route path='/adminPage' element={<AdminPage />} />
                    <Route path='/resetPass' element={<ResetPassword />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

function PageNotFound() {
    return (


        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3}>

                </Grid>
                <Stack sx={{ width: '50%' }} spacing={2}>
                    <Alert variant="outlined" severity="error">
                        404 - Page not found
                    </Alert>
                </Stack>
            </Grid>
        </div>
    );
}

export default App;