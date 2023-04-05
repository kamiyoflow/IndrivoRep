import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountDto from '../entities/AccountDto';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from "react-router-dom";
import { object, string, infer as Infer } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const theme = createTheme();

const schema = object({
    username: string()
        .nonempty('Name is required')
        .min(8, 'Name must be more than 8 characters')
        .max(32, 'Name must be less than 32 characters'),
    email: string().nonempty('Email is required').email('Email is invalid'),
    password: string()
        .nonempty('Password is required')
        .min(6, 'Password must be more than 6 characters')
});
type Schema = Infer<typeof schema>;

function Register() {

    const defaultRole = {
        Role: "User"
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AccountDto>({
        mode: "onChange",
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: AccountDto) => {
        handlePost(data);
    };


    let handlePost = async (props: AccountDto) => {
        props = { ...defaultRole, ...props }
        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(props)

            };
            const response = await fetch(`https://localhost:7156/api/account/register`, requestOptions);
            console.log(props);
            if (response.ok) {
                window.location.href = "http://localhost:3000/auth"
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
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    required
                                    fullWidth
                                    id="nickName"
                                    label="NickName"
                                    autoFocus
                                    {...register("username")}
                                    error={Boolean(errors.username)}
                                    helperText={errors.username?.message}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    {...register("email")}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    autoComplete="age"
                                    {...register("age")}
                                    error={Boolean(errors.age)}
                                    helperText={errors.age?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...register("password")}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={RouterLink} to="/auth" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default Register;