import React from 'react';
import { Card, Button, CardMedia, CardActions, Grid, CardHeader, CardContent, TextField } from '@mui/material';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    // AuthErrorCodes
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
        return true;
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
                            </CardContent>
                            <CardActions>
                            </CardActions>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default Auth;