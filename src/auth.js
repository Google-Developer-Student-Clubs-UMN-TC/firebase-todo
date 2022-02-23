import React from 'react';
import { Card, Button, CardMedia, CardActions, Grid, CardHeader, CardContent, TextField } from '@mui/material';
import {
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.auth = getAuth(props.app);
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
                                <TextField inputRef={(email) => this.email = email} fullWidth type="email" label={"Email"} required></TextField>
                                <TextField inputRef={(pass) => this.password = pass} fullWidth margin="normal" type="password" label={"Password"} required></TextField>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => {
                                    signInWithEmailAndPassword(this.auth, this.email, this.password)
                                        .then((userCredential) => {
                                            alert(userCredential);
                                            // const user = userCredential.user;
                                        })
                                        .catch((error) => {
                                            alert(error);
                                            // const errorCode = error.code;
                                            // const errorMessage = error.message;
                                        });
                                }}>Log In</Button>
                                <Button>Sign Up</Button>
                            </CardActions>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default Auth;