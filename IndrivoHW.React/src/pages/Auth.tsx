import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import AccountLoginDto from '../entities/AccountLoginDto';
import { useForm } from 'react-hook-form';
import { object, string, infer as Infer } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const theme = createTheme();

const schema = object({
    UserName: string()
        .nonempty('Name is required'),
    Password: string()
        .nonempty('Password is required')
        .min(6, 'Password must be more than 6 characters')
});
type Schema = Infer<typeof schema>;

export default function Auth() {

    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Schema>({
        mode: "onChange",
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: Schema) => {
        handlePost(data);
    };

    let handlePost = async (data: AccountLoginDto) => {
        try {
            const user = { userName, password };
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)

            };
            const response = await fetch(`https://localhost:7156/api/account/login`, requestOptions);
            console.log(data);
            if (response.ok) {
                localStorage.setItem('user', userName);
                localStorage.setItem('pass', password);
                window.location.href = "http://localhost:3000"
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="UserName"
                            label="UserName"
                            autoComplete="UserName"
                            autoFocus
                            {...register("UserName")}
                            error={Boolean(errors.UserName)}
                            helperText={errors.UserName?.message}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register("Password")}
                            error={Boolean(errors.Password)}
                            helperText={errors.Password?.message}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>

                        <Grid container>
                            <Grid item xs>
                            <Link component={RouterLink} to="/resetPass" variant="body2">
                                    {"Forgot password?"}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={RouterLink} to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}