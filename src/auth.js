import React from 'react';
import { Card, Button, CardMedia, CardActions, Grid, CardHeader, CardContent, TextField } from '@mui/material';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";

import { connectAuthEmulator } from "firebase/auth";


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.auth = getAuth(props.firebase);
        this.state = {
            error: {
                email: {
                    status: false,
                    message: undefined
                },
                password: {
                    status: false,
                    message: undefined
                }
            }
        };
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
            connectAuthEmulator(this.auth, "http://localhost:9099");
    }

    validateForm() {
        return false;
    }

    render() {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={12}>
                    <div>
                        <Card variant="outlined" width="100%">
                            <CardHeader
                                style={{ textAlign: 'left' }}
                                title={<CardMedia
                                    component="img"
                                    image="GDSC.png"
                                />}
                            />
                            <CardContent component="form">
                                <TextField
                                    fullWidth type="email" label={"Email"} required
                                    error={this.state.error.email.status} helperText={this.state.error.email.message}
                                    inputRef={email => this.email = email} />
                                <TextField
                                    fullWidth margin="normal" type="password" label={"Password"} required
                                    error={this.state.error.password.status} helperText={this.state.error.password.message}
                                    inputRef={password => this.password = password} />
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => {
                                    if (this.validateForm())
                                        signInWithEmailAndPassword(this.auth, this.email.value, this.password.value)
                                            .then((userCredential) => {
                                                this.props.onLogIn(userCredential);
                                            })
                                            .catch((error) => {
                                                console.log(error.code);
                                                console.log(error.message);
                                            });
                                }}>Log In</Button>
                                <Button onClick={() => {
                                    if (this.validateForm()) {
                                        createUserWithEmailAndPassword(this.auth, this.email.value, this.password.value)
                                            .then((userCredential) => {
                                                this.props.onSignUp(userCredential);
                                            })
                                            .catch((error) => {
                                                console.log(error.code);
                                                console.log(error.message);
                                            });
                                    }
                                }}>Sign Up</Button>
                            </CardActions>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default Auth;